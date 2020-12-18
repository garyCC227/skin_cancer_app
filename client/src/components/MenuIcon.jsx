import PropTypes from 'prop-types';

const MenuIcon = ({ name, family, focused }) => (
    <Icon
      name={name}
      family={family}
      size={theme.SIZES.FONT}
      color={focused ? theme.COLORS.WHITE : "#5D5D5D"}
    />
  );
  
  MenuIcon.defaultProps = {
    name: null,
    family: null,
    focused: false,
  };
  
  MenuIcon.propTypes = {
    name: PropTypes.string,
    family: PropTypes.string,
    focused: PropTypes.bool,
  };

export default MenuIcon;