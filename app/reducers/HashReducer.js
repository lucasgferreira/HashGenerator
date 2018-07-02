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
} from '../actions/types';

const INITIAL_STATE = {
    filePath: '',
    fileName: '',
    fileSize: '',
    fileHash: '',
    fileDigests: 'md5',
    text: '',
    textHash: '',
    textDigests: 'md5',
    textComparacao: '',
    modalVisible: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_PATH:
            return { ...state, filePath: action.payload }
        case MODIFICA_FILE_NAME:
            return { ...state, fileName: action.payload }
        case MODIFICA_FILE_SIZE:
            return { ...state, fileSize: action.payload }
        case MODIFICA_HASH_FILE:
            return { ...state, fileHash: action.payload }
        case MODIFICA_DIGESTS_TEXT:
            return { ...state, textDigests: action.payload }
        case MODIFICA_DIGESTS_FILE:
            return { ...state, fileDigests: action.payload }
        case MODIFICA_TEXT:
            return { ...state, text: action.payload }
        case MODIFICA_TEXT_HASH:
            return { ...state, textHash: action.payload }
        case TEXTO_COMPARACAO:
            return { ...state, textComparacao: action.payload }
        case MODIFICA_MODAL_VISIBLE:
            return { ...state, modalVisible: action.payload }
        case APAGA_TEXTO:
            return { ...state, tex: '', text: '', textHash: '', textComparacao: '' }
        case APAGA_FILE:
            return { ...state, filePath: '', fileName: '', fileSize: '', fileHash: '' }
        default:
            return state;
    }
    return state;
}