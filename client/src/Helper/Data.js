import config from "./config";

export default class Data {
    /**
     * 
     * @param {*} path - path of our API localhost:5000/api
     * @param {*} method - GET/POST/PUT/DELETE
     * @param {*} body - body is what we get from the from submitted by the user. 
     * @param {*} requiresAuth - encodes user credentials for authorization
     * @param {*} credentials  - our encoded credentials (username, password)
     */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
        console.log("URL", url)
        return fetch(url, options)
    }

    // Get User
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then((data) => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }
    // Create new user:
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }


    async createCourse(courseDetails, emailAddress, password) {
        const response = await this.api('/courses', 'POST', courseDetails, true, { emailAddress, password })
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }

    async updateCourse(courseID, courseDetails, emailAddress, password) {
        const response = await this.api(`/courses/${courseID}`, 'PUT', courseDetails, true, { emailAddress, password })
        console.log("from DATA", courseID, courseDetails, emailAddress, password)
        if (response.status === 204) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }

    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password })
        if (response.status === 204) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 500) {
            this.props.history.push("/error")
        } else {
            throw new Error();
        }
    }

}
