import {
  getCompId,
  getElement,
  render,
  querySelector,
  loadTemplate,
} from '../utils';
import { canIUseFormFieldButton } from '../../packages/common/version';

jest.mock('../../packages/common/version');

canIUseFormFieldButton.mockReturnValue(true);

let id;

beforeAll(() => {
  // id要唯一，不能每个测试用例都生成一次，不然会报错
  // 或者可以调用  jest.resetModules()，就可以重复生成
  id = getCompId('Button');
});

describe('属性', () => {
  let comp;
  let button;

  beforeEach(() => {
    comp = render(id);
    button = getElement(comp, '.lin-button');
  });

  // 用于 form 组件，可选值为`submit` `reset`，点击分别会触发 form 组件的 submit/reset 事件
  test('formType', () => {
    // 默认情况
    expect(button.getAttribute('formType')).toBe('');
    // 可选值
    const formTypeList = ['submit', 'reset'];
    for (let i = 0; i < formTypeList.length; i++) {
      const formType = formTypeList[i];
      comp.setData({ formType });
      expect(button.getAttribute('formType')).toBe(formType);
    }
  });

  // 是否禁用按钮
  test('disabled', () => {
    const disabledName = 'lin-button-disabled';
    // 默认情况
    expect(button.hasClassName(disabledName)).toBeFalsy();
    // true的情况
    comp.setData({ disabled: true });
    expect(button.hasClassName(disabledName)).toBeTruthy();
  });

  // 是否为块级元素
  test('block', () => {
    const bolckName = 'lin-button-block';
    // 默认情况
    expect(button.hasClassName(bolckName)).toBeFalsy();
    comp.setData({ block: true });
    expect(button.hasClassName(bolckName)).toBeTruthy();
  });

  // 按钮类型
  test('type', () => {
    // 默认情况
    expect(button.hasClassName('lin-button-default')).toBeTruthy();
    // 可选值
    const typeList = [
      'primary',
      'success',
      'info',
      'warning',
      'danger',
      'default',
      'success',
    ];
    for (let i = 0; i < typeList.length; i++) {
      const type = typeList[i];
      comp.setData({ type });
      expect(button.hasClassName(`lin-button-${type}`)).toBeTruthy();
    }
  });

  // 是否为朴素按钮
  test('plain', () => {
    const plainName = 'lin-button-plain';
    // 默认情况
    expect(button.hasClassName(plainName)).toBeFalsy();
    comp.setData({ plain: true });
    expect(button.hasClassName(plainName)).toBeTruthy();
  });

  // 是否为圆角按钮
  test('round', () => {
    const roundName = 'lin-button-round';
    // 默认情况
    expect(button.hasClassName(roundName)).toBeFalsy();
    comp.setData({ round: true });
    expect(button.hasClassName(roundName)).toBeTruthy();
  });

  // 是否为圆形按钮
  test('circle', () => {
    const roundName = 'lin-button-circle';
    // 默认情况
    expect(button.hasClassName(roundName)).toBeFalsy();
    comp.setData({ circle: true });
    expect(button.hasClassName(roundName)).toBeTruthy();
  });

  // 左侧图标相关属性
  test('icon,iconSize', () => {
    // 默认情况
    const icon = getElement(comp, '.lin-button-icon');
    expect(icon.exists()).toBeFalsy();
    comp.setData({
      icon: 'loading',
      iconSize: '14px',
    });
    expect(icon.exists()).toBeTruthy();
    expect(icon.getAttribute('size')).toBe('14px');
  });

  // 按钮尺寸
  test('size', () => {
    // 默认情况
    expect(button.hasClassName('lin-button-size-default')).toBeTruthy();
    const sizeList = ['default', 'medium', 'small'];
    for (let i = 0; i < sizeList.length; i++) {
      const size = sizeList[i];
      comp.setData({ size });
      expect(button.hasClassName(`lin-button-size-${size}`)).toBeTruthy();
    }
  });

  // loading相关属性
  test('loading,loadingColor,loadingSize', () => {
    const loading = getElement(comp, '.lin-button-loading');
    // 默认情况
    expect(loading.exists()).toBeFalsy();
    const loadingSize = '20px';
    const loadingColor = '#fff';
    comp.setData({
      loading: true,
      loadingSize,
      loadingColor,
    });
    expect(loading.exists()).toBeTruthy();
    expect(loading.getAttribute('color')).toBe(loadingColor);
    expect(loading.getAttribute('size')).toBe(loadingSize);
  });

  // 按钮 dataset，open-type 为 `share` 时，可在 onShareAppMessage 事件的 `event.target.dataset.detail` 中看到传入的值
  test('dataset', () => {
    const dataset = { name: 'zhangsan', age: 12 };
    // 默认情况
    expect(button.getAttribute('data-detail')).toBeNull();
    comp.setData({
      dataset,
    });
    expect(button.getAttribute('data-detail')).toEqual(dataset);
  });

  // 按钮颜色，支持传入 linear-gradient 渐变色
  test('color', () => {
    // 默认情况
    expect(comp.data.baseStyle).toBe('');
    // 非朴素按钮情况
    comp.setData({
      color: 'red',
    });
    expect(button.getAttribute('style').replace(/\s+/g, '')).toBe(
      'color:white;background:red;border-color:red;'
    );
    comp.setData({
      color: 'green',
      plain: true,
    });
    expect(button.getAttribute('style').replace(/\s+/g, '')).toBe(
      'color:green;border-color:green;'
    );
    comp.setData({
      color: 'linear-gradient(to right, #4bb0ff, #6149f6)',
    });
    expect(button.getAttribute('style').replace(/\s+/g, '')).toBe(
      'color:linear-gradient(to right, #4bb0ff, #6149f6);border:none;'.replace(
        /\s+/g,
        ''
      )
    );
  });
});

describe('事件', () => {
  let comp;
  let button;
  beforeEach(() => {
    comp = render(id);
    button = getElement(comp, '.lin-button');
  });
  // 点击按钮
  test('click', async () => {
    let fn;
    // 默认情况
    fn = await button.dispatchEvent('tap');
    expect(fn).toBeCalled();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toBeCalledWith('click');

    // 禁用情况
    comp.setData({
      disabled: true,
    });
    fn = await button.dispatchEvent('tap');
    expect(fn).not.toBeCalled();
  });
});

describe('插槽', () => {
  test('default', () => {
    const comp = loadTemplate({
      usingComponents: {
        'lin-button': id,
      },
      template: `<lin-button class='lin-button'>默认按钮</lin-button>`,
    });
    const element = querySelector(comp, '.lin-button');
    expect(element.toJSON()).toMatchSnapshot();
  });
});

describe('外部样式类', () => {
  test('externalClasses', () => {
    const comp = loadTemplate({
      usingComponents: {
        'lin-button': id,
      },
      template: `
        <lin-button 
        custom-class='class-custom'
        loading-class='class-loading'
        icon-class='class-icon'
        hover-class='class-hover'
        class='lin-button'
        ></lin-button>
        `,
    });
    const element = getElement(comp, '.lin-button');
    expect(
      element.hasExternalClass('custom-class', 'class-custom')
    ).toBeTruthy();
    expect(
      element.hasExternalClass('loading-class', 'class-loading')
    ).toBeTruthy();
    expect(element.hasExternalClass('icon-class', 'class-icon')).toBeTruthy();
    expect(element.hasExternalClass('hover-class', 'class-hover')).toBeTruthy();
  });
});
