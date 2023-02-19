import axiosConfig from '../config/axios.js'
export default function () {
    const unauthorizedCheck = (error) => {
        if(error && error.response && error.response.status === 401) {
            // storeda logout actiona istek atılacak.
        }
    }

    const globalErrorCallback = (error) => {
        unauthorizedCheck(error)

        if (axiosConfig.isCancel(error)) {
            throw error;
        }

        throw error;
    }

    const request = {
        get: (url, config) => {
            config = config || {};

            config.source = axiosConfig.CancelToken.source();

            config.cancelToken = config.source.token;

            return axiosConfig.get(url, config).then((res) => {

                return res;
            }, (error) => {
                globalErrorCallback(error)
            })
        },
        post: (url, data, config) => {

            config = config || {};

            config.source = axiosConfig.CancelToken.source();

            config.cancelToken = config.source.token;

            return axiosConfig.post(url, data, config).then((res) => {
                return res;
            }, (error) => {
                globalErrorCallback(error)
            })
        },
        delete: (url, config) => {

            return axiosConfig.delete(url, config).then((res) => {
                return res;
            }, (error) => {
                globalErrorCallback(error)
            })
        },
        put: (url, data, config) => {

            config = config || {};

            config.source = axiosConfig.CancelToken.source();

            config.cancelToken = config.source.token;

            return axiosConfig.put(url, data, config).then((res) => {
                return res;
            }, (error) => {
                globalErrorCallback(error)
            })
        },
    }

    return {
        request
    }
}
