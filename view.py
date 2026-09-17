from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Student
import json


# GET - View all students
def get_students(request):

    students = Student.objects.all()

    data = []

    for student in students:
        data.append({
            "id": student.id,
            "name": student.name,
            "roll_no": student.roll_no,
            "email": student.email,
            "gender": student.gender,
            "department": student.department,
            "year": student.year,
            "attendance": student.attendance
        })

    return JsonResponse(data, safe=False)


# GET - View one student
def get_student(request, id):

    try:
        student = Student.objects.get(id=id)

        data = {
            "id": student.id,
            "name": student.name,
            "roll_no": student.roll_no,
            "email": student.email,
            "gender": student.gender,
            "department": student.department,
            "year": student.year,
            "attendance": student.attendance
        }

        return JsonResponse(data)

    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"})


# POST - Add student
@csrf_exempt
def add_student(request):

    if request.method == "POST":

        data = json.loads(request.body)

        student = Student.objects.create(
            name=data["name"],
            roll_no=data["roll_no"],
            email=data["email"],
            gender=data["gender"],
            department=data["department"],
            year=data["year"],
            attendance=data["attendance"]
        )

        return JsonResponse({
            "message": "Student added successfully",
            "id": student.id
        })


# PUT - Update student
@csrf_exempt
def update_student(request, id):

    if request.method == "PUT":

        try:
            student = Student.objects.get(id=id)

            data = json.loads(request.body)

            student.name = data["name"]
            student.roll_no = data["roll_no"]
            student.email = data["email"]
            student.gender = data["gender"]
            student.department = data["department"]
            student.year = data["year"]
            student.attendance = data["attendance"]

            student.save()

            return JsonResponse({
                "message": "Student updated successfully"
            })

        except Student.DoesNotExist:
            return JsonResponse({
                "error": "Student not found"
            })


# DELETE - Delete student
@csrf_exempt
def delete_student(request, id):

    if request.method == "DELETE":

        try:
            student = Student.objects.get(id=id)

            student.delete()

            return JsonResponse({
                "message": "Student deleted successfully"
            })

        except Student.DoesNotExist:
            return JsonResponse({
                "error": "Student not found"
            })
