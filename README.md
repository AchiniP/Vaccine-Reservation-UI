# Vaccine-Reservation-System Front End
react Based Simple Front End for Vaccine Booking

## Screens


### Screen 1 - As a User I should be able to Start Vaccination Booking by Entering my Identification Number

![alt text](external/Screen1.PNG "ER Diagram")

<br>

### Screen 2 - As a User I Can See Health Advisories upon expanding Accordians in Front Page

![alt text](external/Screen2.PNG "ER Diagram")


### Screen 3 - As a First Time User I Should go to Vaccination Reservation Form

![alt text](external/Screen3.PNG "ER Diagram")

#### Screen 3-1 - I should Be able to select The Vaccine Center From Vaccine Center Drop Down

![alt text](external/Screen4.PNG "ER Diagram")

#### Screen 3-2 - Upon Vaccine Center Selection, I should be able to select a Date within 14 days from the current Date

![alt text](external/Screen5.PNG "ER Diagram")

#### Screen 3-3 - Upon Date Selection, It Should display the available Time Slots - If TimeSlots are not filling fast should display in blue color

![alt text](external/Screen6.PNG "ER Diagram")

#### Screen 3-4 - Upon Date Selection, It Should display the available Time Slots - If TimeSlots are  filling fast should display in red color

![alt text](external/Screen7.PNG "ER Diagram")

#### Screen 3-5 - Upon Date Selection, It Should display the available Time Slots - If TimeSlots are  not available, that particular slot should be disabled

![alt text](external/Screen8.PNG "ER Diagram")

#### Screen 3-6 - Upon Time slot selection, Should be able to see submit button

![alt text](external/Screen9.PNG "ER Diagram")

### Screen 4 - Upon Succesfull Submission of Reservation, I should be able to redirect to the Booking Status view

![alt text](external/Screen10.PNG "ER Diagram")

### Screen 5 - As a user, Upon Clicking on "CANCEL BOOKING" button, My record Should be removed successfully

![alt text](external/Screen11.PNG "ER Diagram")

### Screen 6 - As a user, Upon Clicking on "CHANGE DATE" button, I Shoule be able to redirect to booking page (with auto populated previous data)

![alt text](external/Screen12.PNG "ER Diagram")

### Screen 7 - As a user, Upon Clicking on "CHANGE DATE" button, I Shoule be able to redirect to booking page- and I should be successfully able to change my booking details

![alt text](external/Screen13.PNG "ER Diagram")
![alt text](external/Screen14.PNG "ER Diagram")

### Screen 8 - As a user, If I already have a Pending booking, Upon Entering My IC, I should Not Be directed to Registration Page. Instead I should be redirected to Vaccine Status Page

![alt text](external/Screen15.PNG "ER Diagram")
![alt text](external/Screen16.PNG "ER Diagram")

### Screen 8 - If the logged in user's vaccination status is completed it will show as completed in status page
![alt text](external/Screen17.PNG "ER Diagram")

## Additional Libraries added
- Material UI 
<br>
<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | external | dir | This holds the Screen Shots of Each User flows (as described in read me file)</b>
| 2 | src | dir | This holds the source code |
| 3 | README.md | file | This file |

<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | frontend | 3000 |
<br>

## Commands
All the commands listed should be ran in ./javascript directory.

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database and external (folder).
```bash
npm start
```
<br>


## Design Assumptions

- Admin Screen for Upload Vaccine Center Resources details are not implemented under this UI
- Haven't use PIN based login to enter the system. Used Employee Identification Number to identify each user

## Corresponding Backend API GitHub Link

https://github.com/AchiniP/Vaccine-Reservation-System