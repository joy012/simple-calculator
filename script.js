function getHistory(){
    return document.getElementById('history-value').innerText;
}
function printHistory(num){
    document.getElementById('history-value').innerText = num;
}
function getResult(){
    return document.getElementById('result-value').innerText;
}
function printResult(num){
    if(num == ''){
        document.getElementById('result-value').innerText = '';
    }
    else{
        document.getElementById('result-value').innerText = getCommaSeparateNum(num);
    }
}

// return number separated with comma
function getCommaSeparateNum(num){
    if(num === '-'){
        return '';
    }
    let value = Number(num);
    return value.toLocaleString();
}
// convert comma separated string to number
function convertStringToNum(num){
    return Number(num.split(',').join(''));
}

// add event handler in all operator btn
const operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function(){
        if(this.id === 'clear'){
            printHistory('');
            printResult('');
        }
        else if(this.id === 'backspace'){
            let output = convertStringToNum(getResult()).toString();
            if(output) //if output has a value
            {
                output = output.slice(0,output.length-1);
                printResult(output);
            }
        }
        else{
            let output = getResult();
            let history = getHistory();
            if(output === '' && history !== ''){
                if(isNaN(history[history.length-1])){
                    history = history.slice(0,history.length-1);
                }
            }
            if(output != '' || history !== ''){
                output = output==''? output : convertStringToNum(output);
                history += output;
                if(this.id === 'equal'){
                    const result = eval(history); //eval(string) execute the math expression in string
                    printResult(result);
                    printHistory('');
                }
                else{
                    history = history + this.id;
                    printHistory(history);
                    printResult('');
                }
            }
        }
    })
}

// add event listener to numbers
const digit = document.getElementsByClassName('digit');
for (let i = 0; i < digit.length; i++) {
    digit[i].addEventListener('click', function(){
        let output = convertStringToNum(getResult());
        if(!isNaN(output)){  //returns false for num and ! convert it to true
            output += this.innerText;
            printResult(output);
        }
    })
}