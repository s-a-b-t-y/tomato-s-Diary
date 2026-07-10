PROJECT RULES

1. Create one root file that acts as the deployment entry point.

2. All pages must be organized inside their own folders.

3. Every page should have its own:

- HTML (or page file)
- CSS
- JavaScript

4. Components must be separated into a dedicated components folder.

5. Shared styles must be separated.

6. Shared JavaScript utilities must be separated.

7. Assets must be organized into dedicated folders.

Example:

assets/
    images/
    icons/
    fonts/
    illustrations/

8. Every feature should have its own folder.

Example:

Diary/

Entries/

Home/

Settings/

About/

9. Never place everything inside a single file.

10. Do not create unnecessary files.

11. Do not write unnecessary code.

12. Keep every function modular.

13. Every CSS file should only style its own page or component.

14. Reusable CSS should be placed inside a shared styles folder.

15. Reusable JavaScript should be placed inside a shared utilities folder.

16. All placeholder backend functions should be grouped inside a separate service file.

17. Keep naming consistent.

18. Use meaningful filenames.

19. Use meaningful class names.

20. Maintain a clean architecture that can easily support future backend integration.

21. The root page should handle routing/navigation for deployment.

22. Navigation links must work correctly between all pages.

23. The project should be ready for deployment without requiring structural changes.

24. Every folder should have a clear responsibility.

25. Avoid duplicate components.

26. Follow responsive-first development.

27. The final project should be easy for another developer to understand within five minutes.

28. Keep the project scalable so future features like authentication, cloud sync, reminders, themes, and encryption can be added without restructuring the project.

29. Do not use placeholder lorem ipsum text. Use meaningful diary-themed sample content where needed.

30. Write code as if this were a real production project, not a tutorial.