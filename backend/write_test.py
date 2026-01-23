import os

print("Current working directory:", os.getcwd())

with open("TEST_WRITE.txt", "w") as f:
    f.write("Python can write files here.")

print("✅ File write test completed")
