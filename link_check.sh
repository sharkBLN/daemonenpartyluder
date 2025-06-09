#!/bin/bash
echo "=== Link-Files Checker ==="
for file in *.html; do
  echo "🔍 In $file:"
  # Alle internen Links finden
  grep -o 'href="[^"]\+\.html"' "$file" | sed -e 's/^href="//' -e 's/"$//'
   if [ -f "$link" ]; then
      echo "   ✅ $link vorhanden"
    else
      echo "   ❌ $link fehlt!"
    fi
  done
done

