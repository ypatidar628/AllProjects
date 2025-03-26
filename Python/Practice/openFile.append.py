try : 
    with open("demo.txt","a")as file:
        file.write("\n World!")
    print("Data Append Successfully...")
except Exception as e:
    print("Error : ", str(e))