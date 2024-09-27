package console

import (
	"fmt"

	"github.com/AudiusProject/audius-protocol/core/console/views/pages"
	"github.com/AudiusProject/audius-protocol/core/grpc"
	"github.com/dustin/go-humanize"
	"github.com/labstack/echo/v4"
)

func (con *Console) analyticsPage(c echo.Context) error {
	ctx := c.Request().Context()

	totalBlocks, err := con.db.TotalBlocks(ctx)
	if err != nil {
		return err
	}

	totalTxs, err := con.db.TotalTransactions(ctx)
	if err != nil {
		return err
	}

	totalPlays, err := con.db.TotalTransactionsByType(ctx, grpc.TrackPlaysProtoName)
	if err != nil {
		return err
	}

	totalValidators, err := con.db.TotalValidators(ctx)
	if err != nil {
		return nil
	}

	txsPerHour, err := con.db.TxsPerHour(ctx)
	if err != nil {
		return err
	}

	chartData := []pages.AnalyticsChartData{}
	for _, record := range txsPerHour {
		if record.TxType == grpc.TrackPlaysProtoName {
			chartData = append(chartData, pages.AnalyticsChartData{
				Label: humanize.Time(record.Hour.Time),
				Value: record.TxCount,
			})
		}
	}

	data := &pages.AnalyticsPageView{
		TotalBlocks:       fmt.Sprint(totalBlocks),
		TotalTransactions: fmt.Sprint(totalTxs),
		TotalPlays:        fmt.Sprint(totalPlays),
		TotalValidators:   fmt.Sprint(totalValidators),
		ChartData:         chartData,
	}
	return con.views.RenderAnalyticsView(c, data)
}
