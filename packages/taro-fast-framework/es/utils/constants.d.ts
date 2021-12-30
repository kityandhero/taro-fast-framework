/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
export namespace animalType {
    const none: string;
    const fade: string;
    const queue: string;
}
export const zeroString: "0";
export const zeroInt: 0;
/**
 * 鉴权失败码
 */
export const authenticationFailCode: 2001;
/**
 * Api请求成功码
 */
export const apiSuccessCode: 200;
/**
 * 1970-01-01 00:00
 */
export const emptyDatetime: "1970-01-01 00:00";
/**
 * 用户默认图
 */
export const defaultUserAvatar: "/user.png";
export const defaultEmptyImage: "/noImageSmall.png";
export const emptyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAIsSURBVHic7ZqxaoNQFIb/lL7EHYUU8gB3yih06OATmLlDhm7O4uxQyNDBWZ8gQ4eAYyYfIJDCHe9jtEMtRKPNvY3lh/Z84OTx5L9f9HgDmVlr3/GPuWEHYCMC2AHYiAB2ADYigB2AjQhgB2AjAtgB2IgAdgA2IoAdgI0IYAdgIwLYAdiIAHYANiKAHYCNCGAHYCMCfC8wRQSlEtSXCusESqnOERXmuwuQ9OpVMvIp3r3H+YU7wKCIFFR8QLa3sPbrqLBIl1BRgX7UT6kxUJ3WW9iH154E/96XuL1ytWeY4glps0Jlc4SdMyFyWwEqxjKZw+bt2TrBMgWyvcVj0GsW5rAnTbx7OzDxHVDjJW2gszWGI4RYZxooX9tHyKB4LqGzzfnir+7txrQCzBsO0Ijux1cT3EfQOODNADA7bBtgMb+4ev/ejkws4IjGqbDB0XzVa9x11tQfhu3A9e3tyLQCgjtop8J20YP1IfJ2uO2zk7O+vR2ZWMAcCzTY7sa/ArPbosEC88Ct/se9HZl4CIZ4WAFN+jIyiPqD7HNwjddf09uNyfcBYb5HpkvEZ5ulGomKUeoMm5ORHzxu2voI/b2MOXafet/eLsx8/yRligjLdGAcrarO+3eoblVZjL6i6wQqLvtNB975P+j9Dd4C/hryY4gdgI0IYAdgIwLYAdiIAHYANiKAHYCNCGAHYCMC2AHYiAB2ADYigB2AjQhgB2AjAtgB2IgAdgA2/17AB0T0+YJa7nadAAAAAElFTkSuQmCC";
export namespace appInitDefault {
    export const platformName: string;
    export const appName: string;
    export const appDescription: string;
    export const loginLogo: string;
    export const shareLogo: string;
    export const shareLogoName: string;
    export const leftBarText: string;
    export const companyName: string;
    export const copyright: string;
    export namespace apiPrefix {
        const corsTargetProduction: string;
    }
    export const showSelectLanguage: boolean;
    export const showLogoInLoginView: boolean;
    export { emptyLogo };
    export { emptyLogo as leftBarLogo };
    export { apiSuccessCode };
    export { authenticationFailCode };
    export const loginPath: string;
    export const showLogInConsole: boolean;
    export const showRequestInfo: boolean;
    export const useVirtualRequest: boolean;
    export const showUseVirtualRequestMessage: boolean;
    export const apiVersion: string;
    export const imageUploadMaxSize: number;
    export const audioUploadMaxSize: number;
    export const videoUploadMaxSize: number;
    export const fileUploadMaxSize: number;
    export const useNprogress: boolean;
    export const tinymceApiKey: string;
    export const tinymceImagesUploadUrl: string;
}
export namespace accessWaySpecialCollection {
    export namespace _super {
        const permission: string;
    }
    export { _super as super };
}
export namespace formNameCollection {
    namespace createTime {
        const label: string;
        const name: string;
        const helper: string;
    }
    namespace customOperate {
        const label_1: string;
        export { label_1 as label };
        const name_1: string;
        export { name_1 as name };
        const helper_1: string;
        export { helper_1 as helper };
    }
}
export namespace convertCollection {
    const number: string;
    const datetime: string;
    const string: string;
    const moment: string;
    const money: string;
    const array: string;
}
export namespace formatCollection {
    const money_1: string;
    export { money_1 as money };
    const datetime_1: string;
    export { datetime_1 as datetime };
    export const chineseMoney: string;
    export const percentage: string;
}
export namespace menuType {
    const divider: string;
    const menu: string;
}
export namespace imageContentPreviewMode {
    const html: number;
    const listItem: number;
    const imageList: number;
}
export namespace datetimeFormat {
    const yearMonthDayHourMinuteSecond: string;
    const yearMonthDayHourMinute: string;
    const yearMonthDay: string;
    const yearMonth: string;
    const year: string;
    const monthDayHourMinuteSecond: string;
    const monthDayHourMinute: string;
    const monthDay: string;
    const hourMinute: string;
    const hourMinuteSecond: string;
}
export namespace selectModeCollection {
    const drawer: number;
    const modal: number;
}
export namespace columnFacadeMode {
    export const ellipsis: string;
    export const image: string;
    const datetime_2: string;
    export { datetime_2 as datetime };
    export const badge: string;
    const money_2: string;
    export { money_2 as money };
    export const dropdown: string;
}
export namespace columnPlaceholder {
    const placeholder: boolean;
    const title: string;
    const dataIndex: null;
    const align: string;
    function render(): string;
}
export namespace contentConfig {
    namespace wrapperType {
        export const page: string;
        export const model: string;
        const drawer_1: string;
        export { drawer_1 as drawer };
    }
}
export namespace pageHeaderRenderType {
    const descriptionGrid: string;
    const paragraph: string;
    const action: string;
}
export namespace listViewConfig {
    namespace dataContainerExtraActionBuildType {
        export const generalButton: string;
        export const button: string;
        const dropdown_1: string;
        export { dropdown_1 as dropdown };
        export const dropdownButton: string;
        export const dropdownEllipsis: string;
        export const iconInfo: string;
        export const component: string;
    }
    namespace viewMode {
        const table: number;
        const list: number;
        const cardCollectionView: number;
    }
    namespace tableSize {
        const middle: string;
        const small: string;
        const large: string;
    }
    namespace expandAnimalType {
        import none_1 = animalType.none;
        export { none_1 as none };
        import fade_1 = animalType.fade;
        export { fade_1 as fade };
        import queue_1 = animalType.queue;
        export { queue_1 as queue };
    }
}
export namespace sortOperate {
    const moveUp: string;
    const moveDown: string;
}
export namespace extraBuildType {
    export const refresh: string;
    export const save: string;
    const generalButton_1: string;
    export { generalButton_1 as generalButton };
    const iconInfo_1: string;
    export { iconInfo_1 as iconInfo };
    export const colorText: string;
    export const flexSelect: string;
    const button_1: string;
    export { button_1 as button };
    const dropdownButton_1: string;
    export { dropdownButton_1 as dropdownButton };
    const dropdownEllipsis_1: string;
    export { dropdownEllipsis_1 as dropdownEllipsis };
    const dropdown_2: string;
    export { dropdown_2 as dropdown };
    const component_1: string;
    export { component_1 as component };
}
export namespace drawerConfig {
    export { extraBuildType };
    export namespace bottomBarBuildType {
        export const close: string;
        const refresh_1: string;
        export { refresh_1 as refresh };
        const save_1: string;
        export { save_1 as save };
        const generalButton_2: string;
        export { generalButton_2 as generalButton };
        const iconInfo_2: string;
        export { iconInfo_2 as iconInfo };
        const button_2: string;
        export { button_2 as button };
        const dropdownButton_2: string;
        export { dropdownButton_2 as dropdownButton };
        const dropdownEllipsis_2: string;
        export { dropdownEllipsis_2 as dropdownEllipsis };
        const dropdown_3: string;
        export { dropdown_3 as dropdown };
        const component_2: string;
        export { component_2 as component };
    }
}
export namespace cardConfig {
    export namespace renderType {
        const normal: string;
        const help: string;
    }
    export namespace animalType_1 {
        import none_2 = animalType.none;
        export { none_2 as none };
        import fade_2 = animalType.fade;
        export { fade_2 as fade };
        import queue_2 = animalType.queue;
        export { queue_2 as queue };
    }
    export { animalType_1 as animalType };
    export namespace extraBuildType_1 { }
    export { extraBuildType_1 as extraBuildType };
    export namespace contentItemType {
        const placeholder_1: string;
        export { placeholder_1 as placeholder };
        export const text: string;
        export const input: string;
        export const password: string;
        export const inputNumber: string;
        export const textarea: string;
        const _switch: string;
        export { _switch as switch };
        export const select: string;
        export const whetherSelect: string;
        export const customSelect: string;
        const flexSelect_1: string;
        export { flexSelect_1 as flexSelect };
        export const radio: string;
        export const whetherRadio: string;
        export const customRadio: string;
        export const onlyShowTextarea: string;
        export const onlyShowInput: string;
        export const onlyShowInputDatetime: string;
        export const onlyShowText: string;
        export const imageUpload: string;
        export const imageShow: string;
        export const imageListShow: string;
        export const fileBase64Upload: string;
        export const videoUpload: string;
        export const fileUpload: string;
        export const audioUpload: string;
        export const innerComponent: string;
        const save_2: string;
        export { save_2 as save };
        const button_3: string;
        export { button_3 as button };
        export const actionList: string;
        const component_3: string;
        export { component_3 as component };
        export const nowTime: string;
        export const datePicker: string;
        export const timePicker: string;
        export const jsonView: string;
        export const flexText: string;
        export const onlyShowTextByFlexText: string;
        const divider_1: string;
        export { divider_1 as divider };
        const html_1: string;
        export { html_1 as html };
        export const customGrid: string;
        export const tree: string;
        export const tinymce: string;
    }
}
export namespace searchCardConfig {
    export namespace contentItemType_1 {
        const input_1: string;
        export { input_1 as input };
        const inputNumber_1: string;
        export { inputNumber_1 as inputNumber };
        const customSelect_1: string;
        export { customSelect_1 as customSelect };
        const flexSelect_2: string;
        export { flexSelect_2 as flexSelect };
        const customRadio_1: string;
        export { customRadio_1 as customRadio };
        const onlyShowInput_1: string;
        export { onlyShowInput_1 as onlyShowInput };
        const innerComponent_1: string;
        export { innerComponent_1 as innerComponent };
        const component_4: string;
        export { component_4 as component };
        const datePicker_1: string;
        export { datePicker_1 as datePicker };
        export const customRangePicker: string;
        const divider_2: string;
        export { divider_2 as divider };
    }
    export { contentItemType_1 as contentItemType };
}
export namespace whetherString {
    const no: string;
    const yes: string;
}
export namespace whetherNumber {
    const no_1: number;
    export { no_1 as no };
    const yes_1: number;
    export { yes_1 as yes };
}
export namespace unlimitedWithStringFlag {
    export const key: string;
    const name_2: string;
    export { name_2 as name };
    export const flag: string;
}
export namespace unlimitedWithNumberFlag {
    const key_1: number;
    export { key_1 as key };
    const name_3: string;
    export { name_3 as name };
    const flag_1: number;
    export { flag_1 as flag };
}
export namespace logLevel {
    const debug: string;
    const warn: string;
    const error: string;
}
export namespace logShowMode {
    export const unknown: string;
    const text_1: string;
    export { text_1 as text };
    export const object: string;
}
export namespace dataTypeCollection {
    export namespace unknown_1 {
        const flag_2: number;
        export { flag_2 as flag };
        const name_4: string;
        export { name_4 as name };
    }
    export { unknown_1 as unknown };
    export namespace jsonObject {
        const flag_3: number;
        export { flag_3 as flag };
        const name_5: string;
        export { name_5 as name };
    }
    export namespace jsonObjectList {
        const flag_4: number;
        export { flag_4 as flag };
        const name_6: string;
        export { name_6 as name };
    }
    export namespace commonValue {
        const flag_5: number;
        export { flag_5 as flag };
        const name_7: string;
        export { name_7 as name };
    }
    export namespace html_2 {
        const flag_6: number;
        export { flag_6 as flag };
        const name_8: string;
        export { name_8 as name };
    }
    export { html_2 as html };
}
export namespace notificationTypeCollection {
    export const success: string;
    const error_1: string;
    export { error_1 as error };
    export const info: string;
    export const warning: string;
    const warn_1: string;
    export { warn_1 as warn };
    export const open: string;
}
export namespace messageTypeCollection {
    const success_1: string;
    export { success_1 as success };
    const error_2: string;
    export { error_2 as error };
    const info_1: string;
    export { info_1 as info };
    const warning_1: string;
    export { warning_1 as warning };
    const warn_2: string;
    export { warn_2 as warn };
    export const loading: string;
    const open_1: string;
    export { open_1 as open };
}
export namespace tabBarCollection {
    export { extraBuildType };
}
export namespace mobileTypeCollection {
    namespace roughSketch {
        const label_2: string;
        export { label_2 as label };
        const name_9: string;
        export { name_9 as name };
        const helper_2: string;
        export { helper_2 as helper };
    }
    namespace iphoneX {
        const label_3: string;
        export { label_3 as label };
        const name_10: string;
        export { name_10 as name };
        const helper_3: string;
        export { helper_3 as helper };
    }
    namespace iphone8plus {
        const label_4: string;
        export { label_4 as label };
        const name_11: string;
        export { name_11 as name };
        const helper_4: string;
        export { helper_4 as helper };
    }
    namespace iphone8 {
        const label_5: string;
        export { label_5 as label };
        const name_12: string;
        export { name_12 as name };
        const helper_5: string;
        export { helper_5 as helper };
    }
    namespace iPhone5S {
        const label_6: string;
        export { label_6 as label };
        const name_13: string;
        export { name_13 as name };
        const helper_6: string;
        export { helper_6 as helper };
    }
    namespace galaxyNote8 {
        const label_7: string;
        export { label_7 as label };
        const name_14: string;
        export { name_14 as name };
        const helper_7: string;
        export { helper_7 as helper };
    }
}
