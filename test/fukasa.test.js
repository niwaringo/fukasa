"use strict";

const assert = require("assert");

describe('app login flow', function() {
    beforeEach(() => {
       browser.url("/test/test.html");
    });
    
    it('sets up initial variables', function() {
        let check_dom = browser.isExisting("#dom05");
        assert.strictEqual(check_dom, false);
        browser.scroll(0, 2501);
        check_dom = browser.isExisting("#dom05");
        assert.strictEqual(check_dom, true);
    });
});