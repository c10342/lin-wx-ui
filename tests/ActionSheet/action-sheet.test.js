import { getCompId, getElement, render, querySelectorAll } from "../utils.js";

let id;

beforeAll(() => {
  id = getCompId("action-sheet");
});

describe("属性", () => {
  let comp;

  beforeEach(() => {
    comp = render(id, {
      show: true
    });
  });

  test("show", () => {
    comp = render(id);
    const popup = getElement(comp, ".jest-test-action-sheet");
    // 默认情况
    expect(popup.getAttribute("show")).toBeFalsy();
    comp.setData({
      show: true
    });
    expect(popup.getAttribute("show")).toBeTruthy();
  });

  test("actions", () => {
    const actions = [
      { name: "选项一" },
      { name: "选项二" },
      { name: "选项三" }
    ];
    comp.setData({
      actions
    });
    const actionsList = querySelectorAll(comp, ".lin-action-sheet-button");
    expect(actionsList.length).toBe(actions.length);
  });

  test("round", () => {
    const popup = getElement(comp, ".jest-test-action-sheet");
    // 默认情况
    expect(popup.getAttribute("round")).toBeTruthy();
    comp.setData({
      round: false
    });
    expect(popup.getAttribute("round")).toBeFalsy();
  });

  test("closeOnClickMask", () => {
    const popup = getElement(comp, ".jest-test-action-sheet");
    // 默认情况
    expect(popup.getAttribute("closeOnClickMask")).toBeTruthy();
    comp.setData({
      closeOnClickMask: false
    });
    expect(popup.getAttribute("closeOnClickMask")).toBeFalsy();
  });

  test("cancelText", () => {
    const cancelText = "取消";
    const cancelView = getElement(comp, ".lin-action-sheet-cancelText");
    // 默认是隐藏
    expect(cancelView.exists()).toBeFalsy();
    comp.setData({
      cancelText
    });
    expect(cancelView.exists()).toBeTruthy();
    expect(cancelView.getHtml()).toMatch(cancelText);
  });

  test("description", () => {
    const description = "description";
    const descriptionView = getElement(comp, ".lin-action-sheet-description");
    expect(descriptionView.exists()).toBeFalsy();
    comp.setData({
      description
    });
    expect(descriptionView.exists()).toBeTruthy();
    expect(descriptionView.getHtml()).toMatch(description);
  });

  test("title", () => {
    const title = "title";
    const titleView = getElement(comp, ".lin-action-sheet-title");
    expect(titleView.exists()).toBeFalsy();
    comp.setData({
      title
    });
    expect(titleView.exists()).toBeTruthy();
    expect(titleView.getHtml()).toMatch(title);
  });

  test("showCloseIcon", () => {
    comp = render(id, {
      show: true,
      title: "title"
    });
    const icon = getElement(comp, ".lin-action-sheet-close");
    expect(icon.exists()).toBeTruthy();
    comp.setData({
      showCloseIcon: false
    });
    expect(icon.exists()).toBeFalsy();
  });

  test("zIndex", () => {
    const popup = getElement(comp, ".jest-test-action-sheet");
    expect(popup.getAttribute("zIndex")).toBe(100);
    comp.setData({
      zIndex: 1
    });
    expect(popup.getAttribute("zIndex")).toBe(1);
  });

  test("mask", () => {
    const popup = getElement(comp, ".jest-test-action-sheet");
    expect(popup.getAttribute("mask")).toBeTruthy();
    comp.setData({
      mask: false
    });
    expect(popup.getAttribute("mask")).toBeFalsy();
  });

  test("safeAreaInsetBottom", () => {
    const popup = getElement(comp, ".jest-test-action-sheet");
    expect(popup.getAttribute("safeAreaInsetBottom")).toBeTruthy();
    comp.setData({
      safeAreaInsetBottom: false
    });
    expect(popup.getAttribute("safeAreaInsetBottom")).toBeFalsy();
  });
});
