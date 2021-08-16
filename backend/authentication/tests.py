from django.test import TestCase

# Create your tests here.

string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4ODEwMzc4LCJqdGkiOiIxMjRjZWJjNDdiOWY0NmI2YjJhZjVkZDJkNzE0YTAyZSIsInVzZXJfaWQiOjN9.VVw9gFl2XvO1Lma3YV2Ci35n1L0045V9zOY1WjThzro?redirect_url=http://localhost:3000/login"
splitted = string.split('?redirect')
token = "".join(splitted[0])
print(token)