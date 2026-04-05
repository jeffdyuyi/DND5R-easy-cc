import os
import json
import traceback

def check_data():
    # Use relative path if possible, but let's try to be safe
    directory = '.' 
    results = []
    errors = []
    
    files = [f for f in os.listdir(directory) if f.endswith('.json')]
    
    registry = {} # (eng_name, source) -> filename

    for filename in files:
        filepath = filename
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = json.load(f)
                
                races = []
                if isinstance(content, list):
                    races = content
                elif isinstance(content, dict):
                    if 'race' in content:
                        races = content['race']
                    else:
                        races = [content]
                
                for race in races:
                    if not isinstance(race, dict): continue
                    
                    name = race.get('name')
                    eng_name = race.get('ENG_name')
                    source = race.get('source')
                    
                    if not name or not eng_name or not source:
                        errors.append(f"Missing fields in {filename}: name={name}, eng_name={eng_name}, source={source}")
                        continue
                    
                    # Check filename vs source
                    # Filename pattern: {name}-{source}.json
                    # But some sources have special names or are collective
                    if '-' in filename:
                        parts = filename.replace('.json', '').split('-')
                        fn_source = parts[-1].upper()
                        if fn_source != source.upper():
                            # Some exceptions allowed like ERLW vs EFA maybe? No, usually they match.
                            if not (fn_source == "PHB" and source == "PHB"): # just checking
                                errors.append(f"Source mismatch in {filename}: JSON source={source}")

                    key = (eng_name.lower(), source.upper())
                    if key in registry:
                        errors.append(f"Duplicate entry: {key} in {filename} and {registry[key]}")
                    else:
                        registry[key] = filename
                        
        except Exception as e:
            errors.append(f"Failed to process {filename}: {str(e)}")

    if not errors:
        print("Success: No obvious issues found.")
    else:
        print("Issues found:")
        for err in errors:
            print(f"- {err}")

if __name__ == "__main__":
    check_data()
