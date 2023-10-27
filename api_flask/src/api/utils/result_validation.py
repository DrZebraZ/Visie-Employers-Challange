class ResultValidation:
    def __init__(self):
        self.errorList = []
        self.result = {}

    def concatErrors(self, resultValidation):
        self.errorList += resultValidation.errorList

    def addError(self, tag, message, isCritical=False):
        self.errorList.append({"tag": tag, "message": message, "critical": isCritical})

    def setResult(self, result):
        self.result['data'] = result

    def hasError(self):
        return len(self.errorList) > 0

    def filterCriticalError(self, error):
        if error['critical']:
            return True
        else:
            return False

    def hasCriticalError(self):
        filteredErrors = list(filter(lambda error: error['critical'], self.errorList))
        return len(filteredErrors) > 0

    def mapErrorList(self, error):
        return {"tag": error['tag'], "message": error['message']}

    def getErrorList(self):
        return list(map(self.mapErrorList, self.errorList))

    def isResultEmpty(self):
        return self.result is None or not self.result or len(self.result) == 0

    def getResult(self):
        return self.result

    def findErrorByTags(self, tag_list):
        foundError = []
        for error in self.errorList:
            if error['tag'] in tag_list:
                foundError.append(error)
        return len(foundError) > 0
