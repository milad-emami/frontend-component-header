import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import Avatar from '../Avatar';
import { CaretIcon } from '../Icons';

import messages from './messages';

const AuthenticatedUserDropdown = ({ intl, username }) => {
  const { authenticatedUser } = useContext(AppContext);

  return (
    <>
      <a className="text-gray-700 mr-3" href={`${getConfig().SUPPORT_URL}`}>
        {intl.formatMessage(messages.help)}
      </a>
      <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
        <MenuTrigger
          tag="button"
          aria-label={intl.formatMessage(
            messages['header.label.account.menu.for'],
            { username }
          )}
          className="btn btn-outline-primary d-inline-flex align-items-center pl-2 pr-3"
        >
          <Avatar
            size="1.5em"
            src={authenticatedUser.avatar}
            alt=""
            className="mr-2"
          />
          {username} <CaretIcon role="img" aria-hidden focusable="false" />
        </MenuTrigger>
        <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
          <a
            className="dropdown-item"
            href={`${getConfig().LMS_BASE_URL}/dashboard`}
          >
            {intl.formatMessage(messages.dashboard)}
          </a>
          <a
            className="dropdown-item"
            href={`${getConfig().LMS_BASE_URL}/u/${username}`}
          >
            {intl.formatMessage(messages.profile)}
          </a>
          <a
            className="dropdown-item"
            href={`${getConfig().LMS_BASE_URL}/account/settings`}
          >
            {intl.formatMessage(messages.account)}
          </a>
          {getConfig().ORDER_HISTORY_URL && (
            <a className="dropdown-item" href={getConfig().ORDER_HISTORY_URL}>
              {intl.formatMessage(messages.orderHistory)}
            </a>
          )}
          <a href={getConfig().LOGOUT_URL}>
            {intl.formatMessage(messages.signOut)}
          </a>
        </MenuContent>
      </Menu>
    </>
  );
};

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
