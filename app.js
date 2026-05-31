const goals =
document.querySelectorAll(".goal");

const dailyPercent =
document.getElementById("dailyPercent");

const currentDay =
document.getElementById("currentDay");

const currentWeek =
document.getElementById("currentWeek");

const dailyCircle =
document.getElementById("dailyCircle");

let dayNumber =
parseInt(
localStorage.getItem(
"dayNumber"
)
) || 1;

let weekNumber =
parseInt(
localStorage.getItem(
"weekNumber"
)
) || 1;

currentDay.textContent =
dayNumber;

currentWeek.textContent =
weekNumber;

function calculate(){


let completed = 0;

goals.forEach(goal => {

    if(goal.checked){

        completed++;

    }

});

const percent =
Math.round(
    (
        completed /
        goals.length
    ) * 100
);

dailyPercent.textContent =
percent + "%";

updateCircle(
    dailyCircle,
    percent
);

localStorage.setItem(
    "todayScore",
    percent
);


}

function nextDay(){


const todayScore =
parseInt(
    localStorage.getItem(
        "todayScore"
    )
) || 0;

let dailyHistory =
JSON.parse(
    localStorage.getItem(
        "dailyHistory"
    )
) || [];

dailyHistory.push(
    todayScore
);

localStorage.setItem(
    "dailyHistory",
    JSON.stringify(
        dailyHistory
    )
);

dayNumber++;

if(dayNumber > 7){

    dayNumber = 1;

    weekNumber++;

}

localStorage.setItem(
    "dayNumber",
    dayNumber
);

localStorage.setItem(
    "weekNumber",
    weekNumber
);

currentDay.textContent =
dayNumber;

currentWeek.textContent =
weekNumber;

goals.forEach(goal => {

    goal.checked = false;

});

dailyPercent.textContent =
"0%";

updateCircle(
    dailyCircle,
    0
);


}

function updateCircle(
circle,
percent
){


const circumference =
565;

const offset =
circumference -
(
    percent / 100
)
*
circumference;

circle.style
.strokeDashoffset =
offset;


}
const weeklyPercent =
document.getElementById(
"weeklyPercent"
);

const monthlyPercent =
document.getElementById(
"monthlyPercent"
);

const streakText =
document.getElementById(
"streak"
);

const bestStreakText =
document.getElementById(
"bestStreak"
);

const weeklyCircle =
document.getElementById(
"weeklyCircle"
);

const monthlyCircle =
document.getElementById(
"monthlyCircle"
);

let streak =
parseInt(
localStorage.getItem(
"streak"
)
) || 0;

let bestStreak =
parseInt(
localStorage.getItem(
"bestStreak"
)
) || 0;

streakText.textContent =
streak;

bestStreakText.textContent =
bestStreak;

function updateStats(){


const dailyHistory =
JSON.parse(
    localStorage.getItem(
        "dailyHistory"
    )
) || [];

const last7Days =
dailyHistory.slice(-7);

const weeklyAverage =
last7Days.length
?
Math.round(

    last7Days.reduce(
        (sum,value)=>
        sum + value,
        0
    )

    /

    last7Days.length

)
:
0;

weeklyPercent.textContent =
weeklyAverage + "%";

updateCircle(
    weeklyCircle,
    weeklyAverage
);

const weeklyHistory = [];

for(
    let i = 0;
    i < dailyHistory.length;
    i += 7
){

    const week =
    dailyHistory.slice(
        i,
        i + 7
    );

    const avg =
    Math.round(

        week.reduce(
            (sum,val)=>
            sum + val,
            0
        )

        /

        week.length

    );

    weeklyHistory.push(
        avg
    );
}

const last4Weeks =
weeklyHistory.slice(-4);

const monthlyAverage =
last4Weeks.length
?
Math.round(

    last4Weeks.reduce(
        (sum,val)=>
        sum + val,
        0
    )

    /

    last4Weeks.length

)
:
0;

monthlyPercent.textContent =
monthlyAverage + "%";

updateCircle(
    monthlyCircle,
    monthlyAverage
);


}

function updateStreak(){


const score =
parseInt(
    localStorage.getItem(
        "todayScore"
    )
) || 0;

if(score >= 80){

    streak++;

}else{

    streak = 0;
}

if(
    streak >
    bestStreak
){

    bestStreak =
    streak;
}

localStorage.setItem(
    "streak",
    streak
);

localStorage.setItem(
    "bestStreak",
    bestStreak
);

streakText.textContent =
streak;

bestStreakText.textContent =
bestStreak;


}

function resetTracker(){


localStorage.clear();

location.reload();


}

const originalNextDay =
nextDay;

nextDay = function(){


updateStreak();

originalNextDay();

updateStats();


};

updateStats();
