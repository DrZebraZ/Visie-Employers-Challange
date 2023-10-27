import { 
    errorListSchemaType, 
    errorSchema, 
    resultSchemaType, 
    tagListSchemaType, 
    addResultSchemaType, 
    addResultSchema, 
    addCookieSchemaType, 
    cookieBody 
} from './resultSchema';

export class ResultValidation {


    errorList:errorListSchemaType
    result:resultSchemaType

    constructor() {
        this.errorList = [];
        this.result = {};
    }

    concatErrors(resultValidation: ResultValidation) {
        this.errorList = this.errorList.concat(resultValidation.errorList)
    }

    addError(tag: String, message: String, isCritical:Boolean = false, erro?:any) {
        const error = errorSchema.parse({tag, message, isCritical, erro})
        this.errorList.push(error);
    }

    setResult(result: addResultSchemaType) {
        const res = addResultSchema.parse(result)
        this.result['data'] = res.data;
    }

    setCookie(cookies: addCookieSchemaType){
        const cookie = cookieBody.parse(cookies)
        this.result['cookie'] ? this.result['cookie'].push(cookie) : this.result['cookie'] = [cookie]
    }

    dropCookies(){
        delete this.result['cookie']
    }

    hasError() {
        return this.errorList.length > 0;
    }

    hasCriticalError() {
        return this.errorList.filter(error => error.isCritical).length > 0;
    }

    getErrorList() {
        return this.errorList.map(error => {
            if(error.error != null){
                return {tag: error.tag, message: error.message, error: error.error} 
            }
            return {tag: error.tag, message: error.message}
        });
    }

    isResultEmpty() { //true if empty, false if not empty
        if(this.result === undefined){
            return true
        }else if(!this.result){
            return true
        }else if(this.result.data){
            return false
        }else{
            return true
        }
    }

    getResult() {
        return this.result;
    }

    clearResult(){
        this.result = {}
    }

    findErrorByTags(tagList: tagListSchemaType) {
        return this.errorList.filter(error => tagList.includes(error.tag)).length > 0;
    }
}

