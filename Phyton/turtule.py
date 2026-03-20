import turtle
s= turtle.Screen()
t = turtle.Turtles()
s.bgcolor('pink')
t.speed(0)

col = ["yellow","red","green","black","white", ]
for i in range(150):
    t.pencolor(col[i % 5])
    t.circle(198 - i /2, 90)
    t.left(90)
    t.circle(190 - i /3, 90)
    t.left(60)

s.exitonclick()