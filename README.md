# Obsidian Contacts Plugin
Introducing the [Obsidian](https://obsidian.md/) Contacts Plugin! With this plugin, you can easily organize and manage your contacts within [Obsidian](https://obsidian.md/). Simply create a note with contact information and use the plugin's features to quickly search, filter, and sort through your contacts.

## Usage
After enabling the plugin in the settings menu, you should see the contacts button appear in the left sidebar. Click it to open the Contacts view in the right sidebar.

The plugin reads your contacts folder, which can be changed in the settings, to render all your contacts in the right sidebar.

### Changing the Contacts Folder
1. Go to the settings.
1. Find the "Contacts" tab.
1. Change the value of "Contacts Folder Location" to an existing folder.

https://user-images.githubusercontent.com/9114994/209376300-5d643e65-0f4d-41b8-be7f-565f3a05347c.mov

### Creating a New Contact
1. Click the "Contacts" icon in the left sidebar. The Contacts view should be opened in the right sidebar.
1. Click the "Create" button in the opened Contacts view in the right sidebar.
1. Fill out the created template. See an example below:
```
/---contact---/
| key       | value                    |
| --------- | ------------------------ |
| Name      | carl                     |
| Last Name | johnson                  |
| Phone     | +1 555 555 5555          |
| Telegram  | @carlj567                |
| Linkedin  | linkedin.com/in/carlj567 |
| Birthday  | 1966-12-06               |
| Last chat | 2022-12-06               |
| Friends   | [[Bob]] [[Sue]]          |
/---contact---/
```
Feel free to add more rows, and leave existing ones empty. **Do not rename** existing keys, as they can be used by the plugin.

https://user-images.githubusercontent.com/9114994/209380539-7fe10d19-5d73-4435-a0de-f2c5805e0771.mov

### Searching for Сontacts
You can use different sorting options to find the required contacts:
- Use sorting by birthday to find contacts with the nearest birthdays.
- Use sorting by last contact date to find contacts that you haven't talked to in a long time.
- Use sorting by name to find a specific contact.

https://user-images.githubusercontent.com/9114994/209383369-d7fc0a42-d1df-4980-93e0-46a8541b00b5.mov
