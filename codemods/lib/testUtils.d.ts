import { FileInfo } from 'jscodeshift';
import type { Transform } from 'jscodeshift';

export interface TestOptions {
  parser?: 'ts' | 'tsx' | 'babel' | 'babylon' | 'flow';
}

export interface TransformOptions {
  [key: string]: any;
}

/**
 * Apply a transform to the given source
 */
export function applyTransform(
  module: Transform | { default: Transform },
  options: TransformOptions,
  input: FileInfo,
  testOptions?: TestOptions
): string;

/**
 * Run a snapshot test for the transform
 */
export function runSnapshotTest(
  module: Transform | { default: Transform },
  options: TransformOptions,
  input: FileInfo
): string;

/**
 * Run an inline test comparing the output against an expected string
 */
export function runInlineTest(
  module: Transform | { default: Transform },
  options: TransformOptions,
  input: FileInfo,
  expectedOutput: string,
  testOptions?: TestOptions
): string;

/**
 * Run a test using the fixture files
 */
export function runTest(
  dirName: string,
  transformName: string,
  options: TransformOptions,
  testFilePrefix?: string,
  testOptions?: TestOptions
): Promise<void>;

/**
 * Define a test for a transform
 */
export function defineTest(
  dirName: string,
  transformName: string,
  options: TransformOptions,
  testFilePrefix?: string,
  testOptions?: TestOptions
): void;

/**
 * Define an inline test with the source provided as a string
 */
export function defineInlineTest(
  module: Transform | { default: Transform },
  options: TransformOptions,
  input: string,
  expectedOutput: string,
  testName?: string
): void;

/**
 * Define a snapshot test with the source provided as a string
 */
export function defineSnapshotTest(
  module: Transform | { default: Transform },
  options: TransformOptions,
  input: string,
  testName?: string
): void;

/**
 * Define a snapshot test using fixture files
 */
export function defineSnapshotTestFromFixture(
  dirName: string,
  module: Transform | { default: Transform },
  options: TransformOptions,
  testFilePrefix: string,
  testName?: string,
  testOptions?: TestOptions
): void;
