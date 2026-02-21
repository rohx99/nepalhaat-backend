exports.orderConfirmationTemplate = `

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
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
    style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #0D1627; background-color: #f8f9fa;">
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
                                    <td style="font-size: 28px; font-weight: bold;">Your Order Has Been Confirmed!</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px; padding-top: 10px;">Thank you for your purchase. We're
                                        preparing your order.</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 20px;">
                            <!-- Order Details -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #F88700;">
                                <tr>
                                    <td
                                        style="font-size: 16px; font-weight: bold; color: #F88700; padding-bottom: 15px;">
                                        Order ID - {orderId}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="8">
                                            <tr style="border-bottom: 1px solid #e9ecef;">
                                                <td style="color: #666666;">Order Date:</td>
                                                <td style="font-weight: bold; text-align: right;">{orderedAt}</td>
                                            </tr>
                                            <tr style="border-bottom: 1px solid #e9ecef;">
                                                <td style="color: #666666;">Payment Method:</td>
                                                <td style="font-weight: bold; text-align: right;">Cash On Delivery</td>
                                            </tr>
                                            <tr style="border-bottom: 1px solid #e9ecef;">
                                                <td style="color: #666666;">Subtotal:</td>
                                                <td style="font-weight: bold; text-align: right;">₹{finalPrice}</td>
                                            </tr>
                                            <tr style="border-bottom: 1px solid #e9ecef;">
                                                <td style="color: #666666;">Shipping:</td>
                                                <td style="font-weight: bold; text-align: right;">Free</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666666; font-weight: bold;">Total:</td>
                                                <td style="font-weight: bold; text-align: right;">₹{finalPrice}</td>
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
                                        Your Item</td>
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
                            <!-- Shipping Information -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="background-color: #e8f4fd; padding: 20px; border: 1px solid #bee5eb; margin-top: 20px;">
                                <tr>
                                    <td style="font-weight: bold; color: #0c5460; padding-bottom: 15px;">📦 Shipping
                                        Address</td>
                                </tr>
                                <tr>
                                    <td style="color: #495057; line-height: 1.5;">
                                        {customerName}<br>
                                        {deliveryAddress}
                                    </td>
                                </tr>
                            </table>
                            <!-- What's Next -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin-top: 20px;">
                                <tr>
                                    <td style="font-weight: bold; color: #856404; padding-bottom: 10px;">What's Next?
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #856404;">We'll send you a shipping confirmation email with
                                        tracking information once your order is on its way.</td>
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
                                        or call / whatsapp us at
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
