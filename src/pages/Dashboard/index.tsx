import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { DollarOutlined, RiseOutlined, InteractionOutlined, UserOutlined } from '@ant-design/icons';

export default function Dashboard() {
  const statCards = [
    { title: 'Total Sales', value: '₹1,24,500', icon: <DollarOutlined style={{ fontSize: '2rem', color: '#9E173B' }} /> },
    { title: 'Transactions Today', value: '145', icon: <InteractionOutlined style={{ fontSize: '2rem', color: '#9E173B' }} /> },
    { title: 'Success Rate', value: '98.5%', icon: <RiseOutlined style={{ fontSize: '2rem', color: '#9E173B' }} /> },
    { title: 'Active Terminals', value: '3', icon: <UserOutlined style={{ fontSize: '2rem', color: '#9E173B' }} /> }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, backgroundColor: 'secondary.main', borderRadius: 2 }}>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Revenue Trend
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', backgroundColor: '#fafafa', borderRadius: 2 }}>
                <Typography color="textSecondary">Chart Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', backgroundColor: '#fafafa', borderRadius: 2 }}>
                <Typography color="textSecondary">Activity Feed Placeholder</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
