import { Transform } from "jscodeshift";

// Define the transform function with TypeScript types
const transform: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find all button elements
  return root
    .find(j.JSXElement, {
      openingElement: { name: { name: "button" } },
    })
    .forEach((path) => {
      // Get the existing props
      const props = path.node.openingElement.attributes || [];

      // Add className prop if it doesn't exist
      const hasClassName = props.some(
        (prop) => prop.type === "JSXAttribute" && prop.name.name === "className"
      );

      if (!hasClassName) {
        props.push(
          j.jsxAttribute(
            j.jsxIdentifier("className"),
            j.stringLiteral("primary-button")
          )
        );
      }

      // Add type="button" if it doesn't exist
      const hasType = props.some(
        (prop) => prop.type === "JSXAttribute" && prop.name.name === "type"
      );

      if (!hasType) {
        props.push(
          j.jsxAttribute(j.jsxIdentifier("type"), j.stringLiteral("button"))
        );
      }
    })
    .toSource();
};

export default transform;
