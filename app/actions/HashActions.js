import RNFS from 'react-native-fs';
import forge from 'node-forge';
import b64 from 'base-64';
import RNFetchBlob from 'react-native-fetch-blob';
import bytes from 'bytes';
import { MODIFICA_PATH, 
    MODIFICA_HASH_FILE, 
    MODIFICA_DIGESTS_TEXT, 
    MODIFICA_DIGESTS_FILE, 
    MODIFICA_TEXT, 
    MODIFICA_TEXT_HASH, 
    TEXTO_COMPARACAO,
    MODIFICA_MODAL_VISIBLE,
    MODIFICA_FILE_NAME,
    MODIFICA_FILE_SIZE,
    APAGA_TEXTO,
    APAGA_FILE
} from './types';

const FilePickerManager = require('NativeModules').FilePickerManager;

export const modificaPath = (texto) => {
    return {
        type: MODIFICA_PATH,
        payload: texto
    }
}

export const modificaHashFile = (texto) => {
    return {
        type: MODIFICA_HASH_FILE,
        payload: texto
    }
}

export const modificaDigestsText = (texto) => {
    return {
        type: MODIFICA_DIGESTS_TEXT,
        payload: texto
    }
}

export const modificaDigestsFile = (texto) => {
    return {
        type: MODIFICA_DIGESTS_FILE,
        payload: texto
    }
}

export const modificaText = (texto) => {
    return {
        type: MODIFICA_TEXT,
        payload: texto
    }
}

export const modificaModalVisible = (value) => {
    return {
        type: MODIFICA_MODAL_VISIBLE,
        payload: value
    }
}

export const modificaTextoComparacao = (texto) => {
    return dispatch => {
    dispatch({
        type: TEXTO_COMPARACAO,
        payload: texto
    });
    }
}

export const apagaValores = (valor) => {
    if (valor == 0){
        return {
            type: APAGA_TEXTO
        }
    }
    else {
        return {
            type: APAGA_FILE
        }
    }
}

export const calculaHashArquivo = ({ filePath, fileDigests }) => {
    return dispatch => {
        /// create a path you want to write to
        // hash the file
        try {
            RNFS.hash(filePath, fileDigests)
                .then((success) => {
                    dispatch({
                        type: MODIFICA_HASH_FILE,
                        payload: success
                    });
                })
                .catch((err) => {
                    alert(err.message);
                    dispatch({
                        type: 'erro'
                    });
                });
        }
        catch (Error) { }
    }
}

export const localizaPath = () => {
    return dispatch => {
        FilePickerManager.showFilePicker(null, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled file picker');
                dispatch({
                    type: 'erro'
                });
            }
            else if (response.error) {
                console.log('FilePickerManager Error: ', response.error);
                dispatch({
                    type: 'erro'
                });
            }
            else {
                RNFetchBlob.fs.lstat(response.path)
                .then((stats) => {
                    const bytesSize = bytes(parseInt(stats[0].size), {unitSeparator: ' '});
                    modificaFilePath(response.path, dispatch);
                    modificaFileName(stats[0].filename, dispatch);
                    modificaFileSize(bytesSize, dispatch);
                })
                .catch((err) => {});
            }
        });
    }
}

const modificaFilePath = (filePath, dispatch) => {
    dispatch({
        type: MODIFICA_PATH,
        payload: filePath
    });

}

const modificaFileName = (fileName, dispatch) => {
    dispatch({
        type: MODIFICA_FILE_NAME,
        payload: fileName
    });

}

const modificaFileSize = (fileSize, dispatch) => {
    dispatch({
        type: MODIFICA_FILE_SIZE,
        payload: fileSize
    });

}

export const calculaHashTexto = ({ text, textDigests }) => {
    return dispatch => {
        if (!text == "" || text == null) {

            if (textDigests == 'md5') {
                const md = forge.md.md5.create();
                md.update(text);
                text = md.digest().toHex();
            }
            if (textDigests == 'sha1') {
                const md = forge.md.sha1.create();
                md.update(text);
                text = md.digest().toHex();
            }
            if (textDigests == 'sha256') {
                const md = forge.md.sha256.create();
                md.update(text);
                text = md.digest().toHex();
            }
            if (textDigests == 'sha384') {
                const md = forge.md.sha384.create();
                md.update(text);
                text = md.digest().toHex();
            }
            if (textDigests == 'sha512') {
                const md = forge.md.sha512.create();
                md.update(text);
                text = md.digest().toHex();
            }
            if (textDigests == 'base64encode') {
                try {
                    text = b64.encode(text);
                } catch (Error) {

                }
            }
            if (textDigests == 'base64decode') {
                try {
                    text = b64.decode(text);
                } catch (Error) {
                    text = "";
                }
            }
            
            dispatch({
                type: MODIFICA_TEXT_HASH,
                payload: text
            });
        }
    }
}