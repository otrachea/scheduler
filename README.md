# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```
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

![]()
![]()
![]()

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