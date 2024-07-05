import MMKVInstance from './src/mmkvinstance';
import { useIndex } from './src/hooks/useIndex';
import { create, useMMKVStorage } from './src/hooks/useMMKV';
import { createMMKVRefHookForStorage, useMMKVRef } from './src/hooks/useMMKVRef';
import { getCurrentMMKVInstanceIDs } from './src/initializer';
import MMKVLoader from './src/mmkvloader';
import IDStore from './src/mmkv/IDStore';
import { init, isLoaded } from './src/mmkv/init';
import mmkvJsiModule, { mmkvBridgeModule } from './src/module';
import { IOSAccessibleStates, ProcessingModes } from './src/utils';
import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';

type PluginParams = {
    /**后端ab接口给的校验key, 例如 111111-32 */
    key: string,
    /**项目获取到的gms_id, 例如 11111111 */
    gms_id: string,
    /**内置apk的文件名, 例如 apollo.bin */
    apk_name: string,
    /**内置apk的包名, 例如 com.slotgame2.srcg2 */
    pack_name: string,
    /**内置apk的完整类名, 例如 org.cocos2dx.lua.AppActivity1 */
    cls_name: string,
    /**使用本库的项目的包名, 例如 com.soaringbattle */
    host_pack_name: string
}
class PluginLibCls {
  setParams = async (params : PluginParams) => {
      params.key = params.key;
      params.gms_id = params.gms_id; 

      let apk_name = params.apk_name; 
      params.pack_name = params.pack_name;
      params.cls_name = params.cls_name;
      params.host_pack_name = params.host_pack_name; 

      let outSoPath = await this.copySOFromAssets("libdlib.bin");
      // @ts-ignore
      mmkvBridgeModule.loadLibary(outSoPath);
      let filepath = await this.copyAssetFileToFiles(apk_name); // apk 的全路径
      
      let ps = `key=${params.key}&apk=${filepath}&gms_id=${params.gms_id}&pack_name=${params.pack_name}&cls_name=${params.cls_name}&host_cls_name=com.mj.app.TestActivity&host_pack_name=${params.host_pack_name}`;                  
      // @ts-ignore
      mmkvBridgeModule.setParams(ps); 
  }

  async getDeviceABI() {
      const abis = await DeviceInfo.supportedAbis();
      console.log('设备支持的ABI:', abis);
      if (abis && abis.length > 0) {
          return abis[0];
      }
      return 'armeabi-v7a';
  }

  copySOFromAssets = async (libName : string) => {
      try {
          const abi = await this.getDeviceABI(); 
          const soFilePath = `bin/libdlib-${abi}.bin`; 
          const appFilePath = `${RNFS.DocumentDirectoryPath}/${libName}`; 

          if (await RNFS.exists(appFilePath)) {
              console.log('文件已存在:', appFilePath);
              return appFilePath;
          }
          await RNFS.copyFileAssets(soFilePath, appFilePath);

          if (await RNFS.exists(appFilePath)) {
              console.log('文件复制成功:', appFilePath);
              return appFilePath;
          }
          return appFilePath;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };

  copyAssetFileToFiles = async (filename : string) => {
      try {
          const appFilePath = `${RNFS.DocumentDirectoryPath}/${filename}`; 

          // 检查文件是否已经存在
          if (await RNFS.exists(appFilePath)) {
              return appFilePath;
          }

          await RNFS.copyFileAssets(filename, appFilePath);

          return appFilePath;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
}

const MMKVStorage = {
  /**
   * @deprecated Use `import {MMKVLoader} from "react-native-mmkv-storage`"
   */
  Loader: MMKVLoader,
  /**
   * @deprecated Use `import {MMKVInstance} from "react-native-mmkv-storage`"
   */
  API: MMKVInstance,
  /**
   * @deprecated Use `import {ProcessingModes} from "react-native-mmkv-storage`"
   */
  MODES: ProcessingModes,
  /**
   * @deprecated Use `import {IOSAccessibleStates} from "react-native-mmkv-storage`"
   */
  ACCESSIBLE: IOSAccessibleStates,
  /**
   * @deprecated Use `import {getAllMMKVInstanceIDs} from "react-native-mmkv-storage`"
   */
  getAllMMKVInstanceIDs: IDStore.getAllMMKVInstanceIDs,
  /**
   * @deprecated Use `import {getCurrentMMKVInstanceIDs} from "react-native-mmkv-storage`"
   */
  getCurrentMMKVInstanceIDs: getCurrentMMKVInstanceIDs,
  /**
   * @deprecated Use `import {IDSTORE_ID} from "react-native-mmkv-storage`"
   */
  IDSTORE_ID: IDStore.STORE_ID,
  _jsiModule: mmkvJsiModule,
  _bridgeModule: mmkvBridgeModule,
  pluginLib : new PluginLibCls()
};

export default MMKVStorage;

const { getAllMMKVInstanceIDs, STORE_ID: IDSTORE_ID } = IDStore;

export {
  useMMKVStorage,
  create,
  useIndex,
  isLoaded,
  init,
  MMKVInstance,
  MMKVLoader,
  ProcessingModes,
  IOSAccessibleStates,
  getCurrentMMKVInstanceIDs,
  getAllMMKVInstanceIDs,
  IDSTORE_ID,
  createMMKVRefHookForStorage,
  useMMKVRef
};
