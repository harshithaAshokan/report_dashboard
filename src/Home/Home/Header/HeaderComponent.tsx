import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Grid, Input, Row } from 'antd';
import notify from '../../../assets/notify.png';
import settings from '../../../assets/settings.png';
import user from '../../../assets/user.png';
import classes from './HeaderComponent.module.css';

const { useBreakpoint } = Grid;

export default function HeaderComponent() {
  const screens = useBreakpoint();

  // Define your menu items as an array, not JSX
  const headerMenuItems = [
    { key: 'dashboard', label: 'Dashboard' },
    {
      key: 'notify',
      label: 'Notifications',
      icon: <img src={notify} className={classes.headericon} alt="Notify Icon" />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <img src={settings} className={classes.headericon} alt="Settings Icon" />,
    },
    {
      key: 'user',
      label: 'Mae User',
      icon: <img src={user} className={classes.headericon} alt="User Icon" />,
    },
    { key: 'search', label: 'Search', icon: <SearchOutlined /> },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={0} sm={12} md={12} lg={12}>
          <Row gutter={[16, 16]}>
            {(screens.lg || screens.md || screens.sm) && (
              <Col xs={24} sm={10} md={8} lg={6} className="mt-3">
                <h4 className="text-start">Dashboard</h4>
              </Col>
            )}

            {(screens.lg || screens.md || screens.sm) && (
              <Col sm={7} md={8} lg={9}>
                <Input value="MAE136" className="w-100" />
              </Col>
            )}
            {(screens.lg || screens.md || screens.sm) && (
              <Col sm={7} md={8} lg={9}>
                <Input value="Elmaesure" className="w-100" />
              </Col>
            )}
          </Row>
        </Col>

        {/* Dropdown for small screens */}
        <Col xs={24} sm={12} md={12} lg={12}>
          {screens.xs ? (
            <Dropdown
              menu={{ items: headerMenuItems }} // Pass the items array directly to the menu prop
              className="mb-5"
            >
              <Button icon={<MenuOutlined />} type="primary" className="menubtn" />
            </Dropdown>
          ) : (
            <Row justify="end" gutter={[16, 16]} align="middle">
              <Col>
                <img src={notify} className={classes.headericon} alt="Notify Icon" />
              </Col>
              <Col>
                <img src={settings} className={classes.headericon} alt="Settings Icon" />
              </Col>
              <Col>Mae User</Col>
              <Col>
                <img src={user} className={classes.headericon} alt="User Icon" />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}
