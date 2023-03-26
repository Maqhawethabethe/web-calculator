//declearing variables
const numberButtons=document.querySelectorAll('[data-numbers]')
const operandsButtons=document.querySelectorAll('[data-operands]')
const clearAllButton=document.querySelector('[data-clear-all]')
const deleteButton=document.querySelector('[data-delete]')
const equalsButton=document.querySelector('[data-equals]')
const previousTextElement=document.querySelector('[data-previous]')
const currentTextElement=document.querySelector('[data-current]')


class Calculator{
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement=previousTextElement
        this.currentTextElement=currentTextElement
        this.clearAll()
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)

    }

    clearAll(){
        this.previousOperand=''
        this.currentOperand=''
        this.operation=undefined
        this.previousTextElement.innerText=this.previousOperand
    }

    apendNumber(number){
        if(number=='.'&& this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString()+ number.toString()
      

    }

    chooseOperation(operation){
        if(this.currentOperand=='')return
        if(this.previousOperand!=''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }

    compute(){
        let computation
        const prev=parseFloat(this.previousOperand)
        const cur=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(cur)) return

        switch(this.operation){
            case '+':
                computation=prev+cur
                break
            case '-':
                computation=prev-cur
                break
            case '*':
                computation=prev*cur
                break
            case '/':
                computation=prev/cur  
                break
            default:
                return              
        }
        this.currentOperand=computation
        this.previousOperand=''
        this.operation=undefined
    }

    getDisplayNumber(number){
        const stringNumber=number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.previousTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousTextElement.innerText=''
        }


    }
    
}

//creating a calculator object
const calculator =new Calculator(previousTextElement,currentTextElement)
numberButtons.forEach(Button =>{
    Button.addEventListener('click',()=>{
        calculator.apendNumber(Button.innerText)
        calculator.updateDisplay()
    })
})

operandsButtons.forEach(Button =>{
    Button.addEventListener('click',()=>{
        calculator.chooseOperation(Button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click',()=>{
    calculator.clearAll()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
}) 