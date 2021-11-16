import React from "react";
import { create } from "react-test-renderer";
import { Pagination } from "./Pagination";

describe("Pagination component", () => {
    test("pages count should be 21 but should be showed 10", () => {
        const component = create(<Pagination totalItemsCount={11} currentPage={1}
                                             onPageChanged={() => {}}
                                             pageSize={1} portionSize={10}/>)
        const instance = component.root;
        let spans = instance.findAllByType("span");
        expect(spans.length).toBe(10);
    })

    test("if pages count more then 10 then button Next should be", () => {
        const component = create(<Pagination totalItemsCount={11} currentPage={1}
                                             onPageChanged={() => {}}
                                             pageSize={1} portionSize={10}/>)
        const instance = component.root;
        let button = instance.findAllByType("button");
        expect(button.length).toBe(1);
    })
})