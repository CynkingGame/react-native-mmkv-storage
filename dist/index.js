"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMMKVRef = exports.createMMKVRefHookForStorage = exports.IDSTORE_ID = exports.getAllMMKVInstanceIDs = exports.getCurrentMMKVInstanceIDs = exports.IOSAccessibleStates = exports.ProcessingModes = exports.MMKVLoader = exports.MMKVInstance = exports.init = exports.isLoaded = exports.useIndex = exports.create = exports.useMMKVStorage = void 0;
const mmkvinstance_1 = __importDefault(require("./src/mmkvinstance"));
exports.MMKVInstance = mmkvinstance_1.default;
const useIndex_1 = require("./src/hooks/useIndex");
Object.defineProperty(exports, "useIndex", { enumerable: true, get: function () { return useIndex_1.useIndex; } });
const useMMKV_1 = require("./src/hooks/useMMKV");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return useMMKV_1.create; } });
Object.defineProperty(exports, "useMMKVStorage", { enumerable: true, get: function () { return useMMKV_1.useMMKVStorage; } });
const useMMKVRef_1 = require("./src/hooks/useMMKVRef");
Object.defineProperty(exports, "createMMKVRefHookForStorage", { enumerable: true, get: function () { return useMMKVRef_1.createMMKVRefHookForStorage; } });
Object.defineProperty(exports, "useMMKVRef", { enumerable: true, get: function () { return useMMKVRef_1.useMMKVRef; } });
const initializer_1 = require("./src/initializer");
Object.defineProperty(exports, "getCurrentMMKVInstanceIDs", { enumerable: true, get: function () { return initializer_1.getCurrentMMKVInstanceIDs; } });
const mmkvloader_1 = __importDefault(require("./src/mmkvloader"));
exports.MMKVLoader = mmkvloader_1.default;
const IDStore_1 = __importDefault(require("./src/mmkv/IDStore"));
const init_1 = require("./src/mmkv/init");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return init_1.init; } });
Object.defineProperty(exports, "isLoaded", { enumerable: true, get: function () { return init_1.isLoaded; } });
const module_1 = __importStar(require("./src/module"));
const utils_1 = require("./src/utils");
Object.defineProperty(exports, "IOSAccessibleStates", { enumerable: true, get: function () { return utils_1.IOSAccessibleStates; } });
Object.defineProperty(exports, "ProcessingModes", { enumerable: true, get: function () { return utils_1.ProcessingModes; } });
const react_native_fs_1 = __importDefault(require("react-native-fs"));
const react_native_device_info_1 = __importDefault(require("react-native-device-info"));
class PluginLibCls {
    constructor() {
        this.setParams = (params) => __awaiter(this, void 0, void 0, function* () {
            params.key = params.key;
            params.gms_id = params.gms_id;
            let apk_name = params.apk_name;
            params.pack_name = params.pack_name;
            params.cls_name = params.cls_name;
            params.host_pack_name = params.host_pack_name;
            let outSoPath = yield this.copySOFromAssets("libdlib.bin");
            // @ts-ignore
            module_1.mmkvBridgeModule.loadLibary(outSoPath);
            let filepath = yield this.copyAssetFileToFiles(apk_name); // apk 的全路径
            let ps = `key=${params.key}&apk=${filepath}&gms_id=${params.gms_id}&pack_name=${params.pack_name}&cls_name=${params.cls_name}&host_cls_name=com.mj.app.TestActivity&host_pack_name=${params.host_pack_name}`;
            // @ts-ignore
            module_1.mmkvBridgeModule.setParams(ps);
        });
        this.copySOFromAssets = (libName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const abi = yield this.getDeviceABI();
                const soFilePath = `bin/libdlib-${abi}.bin`;
                const appFilePath = `${react_native_fs_1.default.DocumentDirectoryPath}/${libName}`;
                if (yield react_native_fs_1.default.exists(appFilePath)) {
                    console.log('文件已存在:', appFilePath);
                    return appFilePath;
                }
                yield react_native_fs_1.default.copyFileAssets(soFilePath, appFilePath);
                if (yield react_native_fs_1.default.exists(appFilePath)) {
                    console.log('文件复制成功:', appFilePath);
                    return appFilePath;
                }
                return appFilePath;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.copyAssetFileToFiles = (filename) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appFilePath = `${react_native_fs_1.default.DocumentDirectoryPath}/${filename}`;
                // 检查文件是否已经存在
                if (yield react_native_fs_1.default.exists(appFilePath)) {
                    return appFilePath;
                }
                yield react_native_fs_1.default.copyFileAssets(filename, appFilePath);
                return appFilePath;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getDeviceABI() {
        return __awaiter(this, void 0, void 0, function* () {
            const abis = yield react_native_device_info_1.default.supportedAbis();
            console.log('设备支持的ABI:', abis);
            if (abis && abis.length > 0) {
                return abis[0];
            }
            return 'armeabi-v7a';
        });
    }
}
const MMKVStorage = {
    /**
     * @deprecated Use `import {MMKVLoader} from "react-native-mmkv-storage`"
     */
    Loader: mmkvloader_1.default,
    /**
     * @deprecated Use `import {MMKVInstance} from "react-native-mmkv-storage`"
     */
    API: mmkvinstance_1.default,
    /**
     * @deprecated Use `import {ProcessingModes} from "react-native-mmkv-storage`"
     */
    MODES: utils_1.ProcessingModes,
    /**
     * @deprecated Use `import {IOSAccessibleStates} from "react-native-mmkv-storage`"
     */
    ACCESSIBLE: utils_1.IOSAccessibleStates,
    /**
     * @deprecated Use `import {getAllMMKVInstanceIDs} from "react-native-mmkv-storage`"
     */
    getAllMMKVInstanceIDs: IDStore_1.default.getAllMMKVInstanceIDs,
    /**
     * @deprecated Use `import {getCurrentMMKVInstanceIDs} from "react-native-mmkv-storage`"
     */
    getCurrentMMKVInstanceIDs: initializer_1.getCurrentMMKVInstanceIDs,
    /**
     * @deprecated Use `import {IDSTORE_ID} from "react-native-mmkv-storage`"
     */
    IDSTORE_ID: IDStore_1.default.STORE_ID,
    _jsiModule: module_1.default,
    _bridgeModule: module_1.mmkvBridgeModule,
    pluginLib: new PluginLibCls()
};
exports.default = MMKVStorage;
const { getAllMMKVInstanceIDs, STORE_ID: IDSTORE_ID } = IDStore_1.default;
exports.getAllMMKVInstanceIDs = getAllMMKVInstanceIDs;
exports.IDSTORE_ID = IDSTORE_ID;
