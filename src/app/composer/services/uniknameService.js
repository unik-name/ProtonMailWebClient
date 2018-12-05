const UNIK_NAME_PREFIX = '@';
const UNIK_NAME_LABEL_PREFIX = '#';
const UNIK_NAME_TYPE_MAIL = 'MAIL';

/* @ngInject */
function uniknameService($http, userSettingsModel) {
    this.getUnikEmailConfig = async (value) => {
        if (value && value.indexOf(UNIK_NAME_PREFIX) === 0) {
            // UNIK-NAME
            try {
                let resolvedEmail = await resolve(value, UNIK_NAME_TYPE_MAIL);
                let email = resolvedEmail.data.resolver.address.trim();
                let result = { label: value, value: email, unikname: resolvedEmail.data };
                return result;
            } catch (err) {
                // TODO: Handle 401 403 status
                switch (err.status) {
                    case 401:
                    case 403:
                    case 404:
                    default:
                        console.error(err);
                }
            }
        }
        return { label: value, value };
    };

    this.getUnikard = async (unikname) => {
        let result;
        try {
            let resolvedUnikard = await resolve(unikname);
            result = resolvedUnikard.data;
        } catch (err) {
            switch (err.status) {
                case 401:
                case 403:
                case 404:
                default:
                    console.error(err);
            }
        }
        return result;
    };

    function resolve(unikname, type) {
        let formatedUnikname = unikname ? unikname.replace('@', '') : '';
        let uniknameAndLabel = formatedUnikname.split(UNIK_NAME_LABEL_PREFIX);
        let headers = {
            Pragma: undefined,
            'Cache-Control': undefined,
            'X-Requested-With': undefined,
            'If-Modified-Since': undefined,
            'x-pm-appversion': undefined,
            'x-pm-uid': undefined,
            'x-pm-apiversion': undefined
        };

        let unikNameFrom = userSettingsModel.get('UnikName');

        if (unikNameFrom) {
            headers['Authorization'] = `Basic ${unikNameFrom}`;
        }

        let typeForUrl = type ? `/types/${type}` : '';

        let url = `http://localhost:3000/uniknames/${uniknameAndLabel[0]}/labels/${
            uniknameAndLabel[1] ? uniknameAndLabel[1] : 'default'
        }${typeForUrl}`;

        return $http({
            method: 'GET',
            url: url,
            withCredentials: false,
            headers: headers
        });
    }
}

export default uniknameService;
