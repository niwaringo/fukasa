"use strict";
const assert = require("assert");

describe("fukasa", function() {
    beforeEach(() => {
        browser.url("/test/test.html");
    });

    afterEach(() => {
        browser.scroll(0, 0);
        browser.refresh();
    });

    it("scroll percentage", function() {
        const before_check_dom = browser.isExisting("#dom05");
        assert.strictEqual(before_check_dom, false);
        browser.scroll(0, 4005);
        browser.pause(1000);
        const after_check_dom = browser.isExisting("#dom05");
        assert.strictEqual(after_check_dom, true);
    });

    it("scroll dom", function() {
        const before_check_text = browser.getText("#domtarget");
        assert.strictEqual(before_check_text, "");
        browser.scroll("#domtarget");
        browser.pause(1000);
        const after_check_text = browser.getText("#domtarget");
        assert.strictEqual(after_check_text, "domtarget OK");
    })
});