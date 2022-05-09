# Interview Scheduler

Scheduler is a single page application that lets users book interviews, edit and cancel interviews. This project was mainly used to learn React and modern testing libraries and techniques.

## Setup

1. Clone this project and clone https://github.com/lighthouse-labs/scheduler-api
2. Follow the instructions in the README for scheduler-api to startup and setup the api server
3. Install dependencies with `npm install`.
4. Startup the scheduler-api server in one terminal
5. In another terminal, start the scheduler using `npm start`

## Dependencies

- axios
- React 16.9.0
- Node 10.x or above
- NPM 5.x or above

## Testing Frameworks Used

- Cypress
- Storybook
- Jest
- Mocha
- Chai

## Final Product

![Landing page](https://github.com/otrachea/scheduler/blob/main/docs/landing.png)
![Book interview](https://github.com/otrachea/scheduler/blob/main/docs/book-interview.png)
![Interview hover](https://github.com/otrachea/scheduler/blob/main/docs/interview-hover.png)
![Cancel interview](https://github.com/otrachea/scheduler/blob/main/docs/cancel-interview.png)
![Interview validation](https://github.com/otrachea/scheduler/blob/main/docs/book-interview-validation.png)

# Features
## Creating an interview
To create an interview, click on the desired day on the left hand side. Then click on the plus button in the time slot you want. Enter you name and select an interviewer and click save. A saving indicator will appear before rendering the booked interview in its timeslot. If a name is not entered or an interviewer is not selected, then an appropriate error message will appear.

## Editing an interview
To edit an interview, hover over the interview you would like to edit. The edit form will be loaded with the interview's current information. From there, you can edit the name and change the interviewer. You can also cancel any changes before saving by clicking on the cancel button. Once the desired changes have been made, you can click on the save button. A saving indicator will appear before rendering the edited interview in its timeslot.

## Cancelling an interview
To cancel an interview, hover over the interview you would like to cancel and click on the little garbage button. You will then be shown to a confirmation screen. If you still would like to cancel the interview, click confirm otherwise click cancel. A deleting indicator will appear before rendering the timeslot as empty.

## Spots Update
On the left sidebar, whenever an interview is cancelled or booked the number of spots remaining indicator changes accordingly. When there are no more interview spots left in a day, the day is greyed out.

## Known Issues
Currently there are no known issues.
