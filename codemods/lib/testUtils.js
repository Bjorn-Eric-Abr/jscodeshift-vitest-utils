/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

import { expect, describe, it } from "vitest";
import fs from "fs";
import path from "path";
import jscodeshift from "jscodeshift";

function applyTransform(module, options, input, testOptions = {}) {
  // Handle ES6 modules using default export for the transform
  const transform = module.default ? module.default : module;

  // Get jscodeshift instance with appropriate parser
  let j = jscodeshift;
  if (testOptions.parser || module.parser) {
    j = jscodeshift.withParser(testOptions.parser || module.parser);
  }

  const output = transform(
    input,
    {
      jscodeshift: j,
      j,
      stats: () => {},
    },
    options || {}
  );

  return (output || "").trim();
}

function runSnapshotTest(module, options, input) {
  const output = applyTransform(module, options, input);
  expect(output).toMatchSnapshot();
  return output;
}

function runInlineTest(module, options, input, expectedOutput, testOptions) {
  const output = applyTransform(module, options, input, testOptions);
  expect(output).toBe(expectedOutput.trim());
  return output;
}

function extensionForParser(parser) {
  switch (parser) {
    case "ts":
    case "tsx":
      return parser;
    default:
      return "js";
  }
}

/**
 * Utility function to run a jscodeshift script within a unit test. This makes
 * several assumptions about the environment:
 *
 * - `dirName` contains the name of the directory the test is located in. This
 *   should normally be passed via import.meta.dirname.
 * - The test should be located in a subdirectory next to the transform itself.
 *   Commonly tests are located in a directory called __tests__.
 * - `transformName` contains the filename of the transform being tested,
 *   excluding the .js extension.
 * - `testFilePrefix` optionally contains the name of the file with the test
 *   data. If not specified, it defaults to the same value as `transformName`.
 * - Test data should be located in a directory called __testfixtures__
 *   alongside the transform and __tests__ directory.
 */
async function runTest(
  dirName,
  transformName,
  options,
  testFilePrefix,
  testOptions = {}
) {
  if (!testFilePrefix) {
    testFilePrefix = transformName;
  }

  // Assumes transform is one level up from __tests__ directory
  const module = await import(path.join(dirName, "..", transformName));
  const extension = extensionForParser(testOptions.parser || module.parser);
  const fixtureDir = path.join(dirName, "..", "__testfixtures__");
  const inputPath = path.join(
    fixtureDir,
    testFilePrefix + `.input.${extension}`
  );
  const source = fs.readFileSync(inputPath, "utf8");
  const expectedOutput = fs.readFileSync(
    path.join(fixtureDir, testFilePrefix + `.output.${extension}`),
    "utf8"
  );
  runInlineTest(
    module,
    options,
    {
      path: inputPath,
      source,
    },
    expectedOutput,
    testOptions
  );
}

/**
 * Handles some boilerplate around defining a simple Vitest test for a
 * jscodeshift transform.
 */
function defineTest(
  dirName,
  transformName,
  options,
  testFilePrefix,
  testOptions
) {
  const testName = testFilePrefix
    ? `transforms correctly using "${testFilePrefix}" data`
    : "transforms correctly";
  describe(transformName, () => {
    it(testName, async () => {
      await runTest(
        dirName,
        transformName,
        options,
        testFilePrefix,
        testOptions
      );
    });
  });
}

function defineInlineTest(module, options, input, expectedOutput, testName) {
  it(testName || "transforms correctly", () => {
    runInlineTest(
      module,
      options,
      {
        source: input,
      },
      expectedOutput
    );
  });
}

function defineSnapshotTest(module, options, input, testName) {
  it(testName || "transforms correctly", () => {
    runSnapshotTest(module, options, {
      source: input,
    });
  });
}

/**
 * Handles file-loading boilerplates, using same defaults as defineTest
 */
function defineSnapshotTestFromFixture(
  dirName,
  module,
  options,
  testFilePrefix,
  testName,
  testOptions = {}
) {
  const extension = extensionForParser(testOptions.parser || module.parser);
  const fixtureDir = path.join(dirName, "..", "__testfixtures__");
  const inputPath = path.join(
    fixtureDir,
    testFilePrefix + `.input.${extension}`
  );
  const source = fs.readFileSync(inputPath, "utf8");
  defineSnapshotTest(module, options, source, testName);
}

export {
  applyTransform,
  runSnapshotTest,
  runInlineTest,
  runTest,
  defineTest,
  defineInlineTest,
  defineSnapshotTest,
  defineSnapshotTestFromFixture,
};
