export const medicationsTestArray = [
    //Object
    {name:'Test 1', description:' Desc 1 shows up on every table', dosages:'Dose 1', quantity:'QTY 1', dateAdded:'Date 1', prescriber:'DR 1', 
    timeOfDay: {
        'morning': true,
        'noon': true,
        'evening': true,
        'bedtime': true
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": true,
        "tuesday": true,
        "wednesday": true,
        "thursday": true,
        "friday": true,
        "saturday": true
    }
    },
    //Object
    {name:'Test 2', description:' Desc 2 does not filter by time of day or day of the week', dosages:'Dose 2', quantity:'QTY 2', dateAdded:'Date 2', prescriber:'DR 2', 
    timeOfDay: {
        'morning': false,
        'noon': false,
        'evening': false,
        'bedtime': false
    },
    dayOfTheWeek: {
        "sunday": false,
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false
    }
    },
    //Object
    {name:'Test 3', description:' Desc 3', dosages:'Dose 3', quantity:'QTY 3', dateAdded:'Date 3', prescriber:'DR 3', 
    timeOfDay: {
        'morning': true,
        'noon': false,
        'evening': false,
        'bedtime': false
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false
    }
    },
    //Object
    {name:'Test 4', description:' Desc 4', dosages:'Dose 4', quantity:'QTY 4', dateAdded:'Date 4', prescriber:'DR 4', 
    timeOfDay: {
        'morning': true,
        'noon': false,
        'evening': true,
        'bedtime': false
    },
    dayOfTheWeek: {
        "sunday": false,
        "monday": true,
        "tuesday": false,
        "wednesday": true,
        "thursday": false,
        "friday": true,
        "saturday": false
    }
    },
    //Object
    {name:'Test 5', description:' Desc 5', dosages:'Dose 5', quantity:'QTY 5', dateAdded:'Date 5', prescriber:'DR 5', 
    timeOfDay: {
        'morning': false,
        'noon': true,
        'evening': false,
        'bedtime': true
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": false,
        "tuesday": true,
        "wednesday": false,
        "thursday": true,
        "friday": false,
        "saturday": true
    }
    },
    //Object
    {name:'Test 6', description:' Desc 6', dosages:'Dose 6', quantity:'QTY 6', dateAdded:'Date 6', prescriber:'DR 6', 
    timeOfDay: {
        'morning': false,
        'noon': true,
        'evening': false,
        'bedtime': false
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": true,
        "tuesday": true,
        "wednesday": true,
        "thursday": true,
        "friday": true,
        "saturday": true
    }
    },
    //Object
    {name:'Test 7', description:' Desc 7', dosages:'Dose 7', quantity:'QTY 7', dateAdded:'Date 7', prescriber:'DR 7', 
    timeOfDay: {
        'morning': false,
        'noon': false,
        'evening': true,
        'bedtime': false
    },
    dayOfTheWeek: {
        "sunday": false,
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": true,
        "friday": false,
        "saturday": false
    }
    },
    //Object
    {name:'Test 8', description:' Desc 8', dosages:'Dose 8', quantity:'QTY 8', dateAdded:'Date 1', prescriber:'DR 8', 
    timeOfDay: {
        'morning': false,
        'noon': false,
        'evening': false,
        'bedtime': true
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": false,
        "tuesday": true,
        "wednesday": false,
        "thursday": true,
        "friday": false,
        "saturday": true
    }
    },
    //Object
    {name:'Test 9', description:' Desc 9', dosages:'Dose 9', quantity:'QTY 9', dateAdded:'Date 7', prescriber:'DR 8', 
    timeOfDay: {
        'morning': true,
        'noon': true,
        'evening': true,
        'bedtime': true
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": true,
        "tuesday": true,
        "wednesday": true,
        "thursday": true,
        "friday": true,
        "saturday": true
    }
    },
    //Object
    {name:'Test 10', description:' Desc 10', dosages:'Dose 10', quantity:'QTY 10', dateAdded:'Date 7', prescriber:'DR 8', 
    timeOfDay: {
        'morning': true,
        'noon': true,
        'evening': true,
        'bedtime': true
    },
    dayOfTheWeek: {
        "sunday": true,
        "monday": true,
        "tuesday": true,
        "wednesday": true,
        "thursday": true,
        "friday": true,
        "saturday": true
    }
    },
];

//mock medication database for testing medication display table component