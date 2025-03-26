def duplicate(input_list):
    unique_list = []
    for item in input_list:
        if item not in unique_list:
            unique_list.append(item)
    print("Unique List is :",sorted(unique_list))
    

list = [1,2,3,4,21,3,4,55,6,67];

duplicate(list)