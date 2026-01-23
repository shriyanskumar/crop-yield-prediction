import os

DATASET_DIR = r"C:\Users\kumar\AndroidStudioProjects\DTLcursor\dataset"

print("Scanning dataset at:", DATASET_DIR)

for label in ["low", "medium", "high"]:
    folder = os.path.join(DATASET_DIR, label)
    print("\nFolder:", folder)

    if not os.path.exists(folder):
        print("❌ Folder does not exist")
        continue

    files = os.listdir(folder)
    print("Files found:", files)
