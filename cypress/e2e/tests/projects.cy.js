import Login from '../page-objects/login'
import Projects from '../page-objects/projects'
import { adminUser } from '../../support/constants'
import Util from '../../support/util'

const login = new Login()
const projects = new Projects()
const util = new Util()

describe('User can interact with projects', () => {
    before(() => {
        login.loginAsCustomer(adminUser.EMAIL, adminUser.PASSWORD)
    })

    after(() => {
        login.logout()
    })
    
    it('Create a new project', () => {
        projects.createNewProjectByLocation('Whitewater Center Parkway')

        // Cypress may have s a cleaner way to handle the promise so that we have projectId
        // before I use it to delete the test data
        util.getProjectId().then(projectId => {
            projects.enterDescription('This is a test description')
            projects.addTask('This is a test task')
    
            // Clean up data
            util.deleteProjects([projectId])
        })
    })    
})
