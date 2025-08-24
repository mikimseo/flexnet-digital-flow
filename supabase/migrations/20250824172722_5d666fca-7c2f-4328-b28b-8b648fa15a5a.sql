-- Update menu item to point to portfolio section on main page instead of separate page
UPDATE menu_items 
SET href = '#portfolio'
WHERE key = 'portfolio' AND href = '/portfolio';