console.log(
    "Batman Goal Tracker V2 Loaded"
    );
    
    function getAnalytics(){
    
    
    const history =
    JSON.parse(
        localStorage.getItem(
            "history"
        )
    ) || [];
    
    if(history.length === 0){
    
        return {
    
            totalDays:0,
    
            averageScore:0,
    
            bestScore:0
    
        };
    }
    
    const averageScore =
    Math.round(
    
        history.reduce(
            (sum,item)=>
            sum + item.score,
            0
        )
    
        /
    
        history.length
    
    );
    
    const bestScore =
    Math.max(
    
        ...history.map(
            item =>
            item.score
        )
    
    );
    
    return {
    
        totalDays:
        history.length,
    
        averageScore:
        averageScore,
    
        bestScore:
        bestScore
    
    };
    
    
    }
    