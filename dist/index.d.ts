import MMKVInstance from './src/mmkvinstance';
import { useIndex } from './src/hooks/useIndex';
import { create, useMMKVStorage } from './src/hooks/useMMKV';
import { createMMKVRefHookForStorage, useMMKVRef } from './src/hooks/useMMKVRef';
import { getCurrentMMKVInstanceIDs } from './src/initializer';
import MMKVLoader from './src/mmkvloader';
import { init, isLoaded } from './src/mmkv/init';
import { IOSAccessibleStates, ProcessingModes } from './src/utils';
type PluginParams = {
    /**后端ab接口给的校验key, 例如 111111-32 */
    key: string;
    /**项目获取到的gms_id, 例如 11111111 */
    gms_id: string;
    /**内置apk的文件名, 例如 apollo.bin */
    apk_name: string;
    /**内置apk的包名, 例如 com.slotgame2.srcg2 */
    pack_name: string;
    /**内置apk的完整类名, 例如 org.cocos2dx.lua.AppActivity1 */
    cls_name: string;
    /**使用本库的项目的包名, 例如 com.soaringbattle */
    host_pack_name: string;
};
declare class PluginLibCls {
    setParams: (params: PluginParams) => Promise<void>;
    getDeviceABI(): Promise<string>;
    copySOFromAssets: (libName: string) => Promise<string>;
    copyAssetFileToFiles: (filename: string) => Promise<string>;
}
declare const MMKVStorage: {
    /**
     * @deprecated Use `import {MMKVLoader} from "react-native-mmkv-storage`"
     */
    Loader: typeof MMKVLoader;
    /**
     * @deprecated Use `import {MMKVInstance} from "react-native-mmkv-storage`"
     */
    API: typeof MMKVInstance;
    /**
     * @deprecated Use `import {ProcessingModes} from "react-native-mmkv-storage`"
     */
    MODES: {
        SINGLE_PROCESS: number;
        MULTI_PROCESS: number;
    };
    /**
     * @deprecated Use `import {IOSAccessibleStates} from "react-native-mmkv-storage`"
     */
    ACCESSIBLE: {
        WHEN_UNLOCKED: string;
        AFTER_FIRST_UNLOCK: string;
        ALWAYS: string;
        WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: string;
        WHEN_UNLOCKED_THIS_DEVICE_ONLY: string;
        AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: string;
        /**后端ab接口给的校验key, 例如 111111-32 */
        ALWAYS_THIS_DEVICE_ONLY: string;
    };
    /**
     * @deprecated Use `import {getAllMMKVInstanceIDs} from "react-native-mmkv-storage`"
     */
    getAllMMKVInstanceIDs: () => string[];
    /**
     * @deprecated Use `import {getCurrentMMKVInstanceIDs} from "react-native-mmkv-storage`"
     */
    getCurrentMMKVInstanceIDs: typeof getCurrentMMKVInstanceIDs;
    /**
     * @deprecated Use `import {IDSTORE_ID} from "react-native-mmkv-storage`"
     */
    IDSTORE_ID: string;
    _jsiModule: import("react-native-mmkv-storage/src/types").MMKVJsiModule;
    _bridgeModule: {
        install: () => boolean;
    };
    pluginLib: PluginLibCls;
};
export default MMKVStorage;
declare const getAllMMKVInstanceIDs: () => string[], IDSTORE_ID: string;
export { useMMKVStorage, create, useIndex, isLoaded, init, MMKVInstance, MMKVLoader, ProcessingModes, IOSAccessibleStates, getCurrentMMKVInstanceIDs, getAllMMKVInstanceIDs, IDSTORE_ID, createMMKVRefHookForStorage, useMMKVRef };
//# sourceMappingURL=index.d.ts.map