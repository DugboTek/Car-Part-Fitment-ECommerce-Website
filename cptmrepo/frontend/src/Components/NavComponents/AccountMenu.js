// Ali Moulton
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  import "../../Styles/main.css"
  import "../../Styles/AccountMenu.js"



  function AccountMenu() 
  {
    return (
        <div className="account-menu">
            <Menu >
                <MenuButton as={Button} colorScheme='gray'>
                    My Account
                </MenuButton>
                <MenuList>
                    <MenuGroup >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My Garage</MenuItem>
                        <MenuItem>Orders</MenuItem>
                        <MenuItem>Saved for Later</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup>
                        <MenuItem>Sign Out</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>

        </div>

    );
  }

  export default AccountMenu;