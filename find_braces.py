with open('/var/www/wordpress/wp-content/themes/twentytwentyfive-child/style.css', 'r') as f:
    stack = []
    for i, line in enumerate(f, 1):
        for char in line:
            if char == '{':
                stack.append(i)
            elif char == '}':
                if stack:
                    stack.pop()
                else:
                    print(f"Extra closing brace at line {i}")
    for line_num in stack:
        print(f"Unclosed opening brace from line {line_num}")
