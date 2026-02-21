exports.orderCancellationTemplate = `

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order Has Been Canceled</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }

            .item-image {
                width: 100% !important;
                max-width: 100px !important;
                height: auto !important;
            }

            .item-table {
                display: block !important;
            }

            .item-image-cell {
                display: block !important;
                text-align: center !important;
                padding: 0 0 15px 0 !important;
            }

            .item-details-cell {
                display: block !important;
                text-align: center !important;
            }
        }
    </style>
</head>

<body
    style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; background-color: #f8f9fa;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff;"
                    class="container">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0D1627; padding: 40px 20px; text-align: center; color: #F88700;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="font-size: 28px; font-weight: bold;">Your Order Has Been Canceled</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px; padding-top: 10px;">We’ve processed your cancellation
                                        request.</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 20px;">
                            <!-- Order Information -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #F88700;">
                                <tr>
                                    <td
                                        style="font-size: 16px; font-weight: bold; color: #F88700; padding-bottom: 15px;">
                                        Order Information</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="8">
                                            <tr style="border-bottom: 1px solid #e9ecef;">
                                                <td style="color: #666666;">Order ID:</td>
                                                <td style="font-weight: bold; text-align: right;">{orderId}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!-- Items -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top: 20px;">
                                <tr>
                                    <td
                                        style="font-size: 20px; font-weight: bold; color: #333333; padding-bottom: 15px;">
                                        Canceled Item</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                            style="background-color: #ffffff; border: 1px solid #e9ecef; padding: 20px;"
                                            class="item-table">
                                            <tr>
                                                <td width="80" style="padding-right: 20px; text-align: center;"
                                                    class="item-image-cell">
                                                    <img src="https://api.nepalhaat.com/{productImage}"
                                                        style="width: 100%; max-width: 80px; height: auto; display: block; margin: 0 auto;"
                                                        class="item-image" alt="Product Image">
                                                </td>
                                                <td class="item-details-cell">
                                                    <div style="font-weight: bold; font-size: 16px;">{productName}</div>
                                                    <div style="color: #666666; font-size: 14px; padding: 5px 0;">
                                                        Quantity: {quantity}</div>
                                                    <div style="font-weight: bold; color: #F88700; font-size: 16px;">
                                                        ₹{finalPrice}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!-- Cancellation Information -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-top: 20px;">
                                <tr>
                                    <td style="font-weight: bold; color: #856404; padding-bottom: 10px;">Cancellation
                                        Information</td>
                                </tr>
                                <tr>
                                    <td style="color: #856404;">Your order has been canceled. If this was not requested
                                        by you or if you have any questions, please contact our customer service team.
                                        We’d be happy to assist you with placing a new order or addressing any concerns.
                                    </td>
                                </tr>
                            </table>
                            <!-- CTA Button -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="padding: 20px 0; text-align: center;">
                                <tr>
                                    <td>
                                        <a href="https://nepalhaat.com"
                                            style="display: inline-block; background-color: #F88700; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: bold; font-size: 16px;">Visit
                                            Our Store</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666666; font-size: 14px; border-top: 1px solid #e9ecef;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="font-weight: bold; padding-bottom: 10px;">Need Help?</td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 10px;">
                                        Contact our customer service team at
                                        <a href="mailto:nepalhaat@gmail.com"
                                            style="color: #F88700; text-decoration: none;">nepalhaat@gmail.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        or call us at
                                        <a href="tel:+9779707358132" style="color: #F88700; text-decoration: none;">+977
                                            9707358132</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 12px; color: #999999; padding-top: 20px;">
                                        © 2025 NepalHaat. All rights reserved
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>

`;
