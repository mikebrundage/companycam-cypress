import Util from '../../support/util'
var util = new Util()

const PROJECTS_CREATE_PROJECT_BUTTON = 'button[data-testid="project-feed__create-project"]'
const CREATE_PROJECT_ADDRESS_INPUT = 'input[name=project_address]'
const CREATE_PROJECT_ADDRESS_OPTIONS = '.pac-matched'
const CREATE_PROJECT_NAME = 'input[id=name]'
const CREATE_PROJECT_CREATE_PROJECT_BUTTON = 'button[type=submit] span'
const PROJECT_DETAIL_DESCRIPTION_ADD_BUTTON = '[aria-label="Description"] button'
const PROJECT_NOTES_TEXTFIELD = 'trix-editor[id=project-notes-editor]'
const PROJECT_NOTES_SAVE_BUTTON = 'Save'
const TASK_NEW_TASK_BUTTON = 'New Task'
const PROJECTS_PROJECT_DETAIL_TITLE = 'h1[data-testid="projects__title-heading"]'

var uuid = util.getUuid()

class Projects {
    openCreateProjectDialog = () => {
        cy.get(PROJECTS_CREATE_PROJECT_BUTTON).click()
        cy.url().should('include', '/projects/new')
    }

    createProjectByLocation = (locationAddressOrName) => {
        cy.wait(2000) // Prefer to not explicity wait but this is a workaround for now
        cy.get(CREATE_PROJECT_ADDRESS_INPUT).type(locationAddressOrName)
        cy.get(CREATE_PROJECT_ADDRESS_INPUT).click()
        cy.get(CREATE_PROJECT_ADDRESS_OPTIONS).first().click()
        cy.get(CREATE_PROJECT_NAME).should('have.value', locationAddressOrName)
        // Ensure project name has not been used before
        cy.get(CREATE_PROJECT_NAME).type(uuid)
        cy.get(CREATE_PROJECT_CREATE_PROJECT_BUTTON).click()
        cy.get(PROJECTS_PROJECT_DETAIL_TITLE).should('exist')
    }

    enterDescription = (description) => {
        cy.get(PROJECT_DETAIL_DESCRIPTION_ADD_BUTTON).click()
        cy.get(PROJECT_NOTES_TEXTFIELD).type(description)
        cy.contains(PROJECT_NOTES_SAVE_BUTTON).click()
    }

    addTask = (task) => {
        cy.contains(TASK_NEW_TASK_BUTTON).click().type(task).type('{enter}')
        cy.contains(task).should('exist')
    }

    createNewProjectByLocation = (locationAddressOrName) => {
        this.openCreateProjectDialog()
        this.createProjectByLocation(locationAddressOrName)
    }

}

module.exports = Projects