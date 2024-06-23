class Util {
    getProjectId = () => {
        return new Promise((resolve) => {
            cy.location().then((url) => {
                const urlString = url.toString();
                const pattern = /\/[0-9]+\//g;
                const match = urlString.match(pattern);
                let projectId = null;
                if (match) {
                    projectId = match[0].slice(1, -1);
                }
                resolve(projectId); // Resolve the Promise with the projectId value
            });
        });
    }
    getUuid = () => {
        const uuid = crypto.randomUUID();
        return uuid
    }

    deleteProjects = (projectIds) => {
        projectIds.forEach(projectId => {
            cy.request('DELETE', `v1/locations/${projectId}`).then(response => {
                expect(response.status).to.eq(204)
            })
        })
    }
    
}

module.exports = Util
















