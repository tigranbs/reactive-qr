import React from "react";
import BaseDiv from "./index";
import renderer from "react-test-renderer";

describe("TextInput", () => {
  it("renders properly", () => {
    const tree = renderer
      .create(<BaseDiv />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});