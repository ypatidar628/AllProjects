def calculator():
    try:
        num1 = float(input("Enter the first number: "))
        operator = input("Enter the operator (+, -, *, /): ")
        num2 = float(input("Enter the second number: "))
        
        if(operator == "+" or operator == "-" or operator == "*" or operator == "/"):
            
                if(operator == "+"):
                    print(f"{num1} + {num2} = {num1 + num2}")
                    
                elif(operator == "-"):
                                print(f"{num1} - {num2} = {num1 - num2}")

                elif(operator == "*"):
                                print(f"{num1} * {num2} = {num1 * num2}")

                elif(operator == "/"):
                                print(f"{num1} / {num2} = {num1 / num2}")
                else:
                    print("Invalid Number! Please Enter Only Numeric Values.")
        else:
            print("Invalid Operator!")

    except TypeError:
        print("Invalid Operation!")

calculator()   