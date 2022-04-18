function convert_num_to_binary(num,Length){
    let ans = [];

    while(num)
    {
        ans.push(num % 2);
        num = parseInt(num / 2);
    }
    

    while(ans.length != Length)
        ans.push(0);
    return ans.reverse();
}

function fillArrayFromBegin(value,stop){
    let ans = [];

    for(let i = 0; i <= stop; i++)
        ans.push(value);

    return ans;
}


function binary_to_decimal(str)
{
    let ans = 0;
    let cnt = 0;

    for(let i = str.length - 1; i >= 0; i --)
    {
        if(str[i] == '1')
            ans += Math.pow(2,cnt);
        cnt += 1;
    }

    return ans;
}   


class CellularAutomata{

    // Constructor Function
    constructor(ruleNum,genSize,genCount,initialConfig = [])
    {
        this.ruleNum = ruleNum;
        this.genSize = genSize;
        this.genCount = genCount;

        this.ruleSet = convert_num_to_binary(this.ruleNum,8);
        this.generations = [];

        if(initialConfig.length == 0)
        {
            this.presentGeneration = [];
            
            this.presentGeneration = fillArrayFromBegin(0,this.genSize - 1);
            
            this.presentGeneration[parseInt(this.presentGeneration.length / 2)] = 1;
        }

        else{
            this.presentGeneration = initialConfig;
        }

        this.generations.push(this.presentGeneration);

        this.simulateProcess()
    }



    // Simulating the Generation
    simulateProcess(){
        for(let i = 0; i < this.genCount; i++)
            this.generateNextGeneration();
    }
    

    // Function for getting Equivalent State of Each cell given its neighbour details
    getEquivalentState(left,self,right){
        return this.ruleSet[binary_to_decimal(`${left}${self}${right}`)];
    }


    generateNextGeneration(){
        let nextGen = [];

        nextGen.push(this.presentGeneration[0]);

        for(let i = 1; i < this.genSize - 1;i++)
        {

            // Getting the State for the Next Generation for the cell under consideration by taking its neighbours
            let res = this.getEquivalentState(this.presentGeneration[i - 1],this.presentGeneration[i],this.presentGeneration[i + 1]);
            nextGen.push(res);
        }

        nextGen.push(this.presentGeneration[this.genSize - 1]);

        // Making the Next Generation as Present
        this.generations.push(nextGen);
        this.presentGeneration = nextGen;
    }


    showOnScreen(){
        let mainCellularApp = document.getElementsByClassName('mainDrawing')[0];
        mainCellularApp.innerHTML = '';

        const heading = document.createElement('h1');
        heading.innerText = `Rule - ${this.ruleNum} with ${this.genCount} Generation(s) of ${this.genSize} Members each`;
        document.getElementsByClassName('text')[0].innerHTML = ''
        document.getElementsByClassName('text')[0].appendChild(heading);

        for(let i=0;i<this.genCount;i++)
        {
            let div = document.createElement('div');
            div.classList.add('row');

            for(let j=0;j<this.genSize;j++)
            {
                let div2 = document.createElement('div');
                div2.classList.add(this.generations[i][j] == 1 ? 'black' : 'white');
                div.appendChild(div2);
            }

            mainCellularApp.appendChild(div);
        }
    }
};




// Driver Code
(() => {
    const ruleNum = document.getElementById('ruleNum');
    const genSize = document.getElementById('genSize');
    const genCount = document.getElementById('genCount');
    const submit = document.getElementsByClassName('submit-btn')[0];

    const list = ['1','2','3','4','5','6','7','8','9','0'];


    //  RuleNumber must be a number between 0-255
    ruleNum.addEventListener('input',() => {
        let ip = ruleNum.value;

        if(list.indexOf(ip[ip.length - 1]) == -1)
        ruleNum.value = ip.slice(0,-1);

        if(parseInt(ruleNum.value) >= 256)
        ruleNum.value = ruleNum.value.slice(0,-1);
    });


    // genSize must be a number
    genSize.addEventListener('input',() => {
        let ip = genSize.value;

        if(list.indexOf(ip[ip.length - 1]) == -1)
        genSize.value = ip.slice(0,-1);
    });

    // genCount must be a number
    genCount.addEventListener('input',() => {
        let ip = genCount.value;

        if(list.indexOf(ip[ip.length - 1]) == -1)
        genCount.value = ip.slice(0,-1);
    });

    // Getting the Cellular Automata
    submit.addEventListener('click',() => {
        let rule_number = ruleNum.value;
        let generation_size = genSize.value;
        let generation_count = genCount.value;

        // If any of the Values are empty
        if(rule_number == '' || generation_size == '' || generation_count == '')
            return alert("Please Enter Correct Values. No Inputs can be Empty!!");

        // Creating and showing a Cellular Automata Object
        caObj =  new CellularAutomata(rule_number,generation_size,generation_count);
        caObj.showOnScreen();
    })


    // Initial Configuration of The Screen
    ca1 = new CellularAutomata(90,75,50);
    ca1.showOnScreen();
})();